import {
  addDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { geminiFlash } from "libs/gemini";
import { fileToGenerativePart } from "libs/geminiMappers";
import { Part } from "firebase/vertexai-preview";
import { meetingsCollection } from "database/db";
import { MeetingFormData } from "app/components/MeetingForm";
import { uploadMeetingFiles } from "./uploadMeetingFiles";

export const createNewMeeting = async (
  data: MeetingFormData & { userId: string }
) => {
  const { meetingName, participants, date, notes, attachments, userId } = data;

  // upload files
  const uploadedFiles = await uploadMeetingFiles(attachments, {
    date,
    name: meetingName,
  });

  // create meeting in DB
  const meetingDoc = await addDoc(meetingsCollection, {
    name: meetingName,
    status: "PROCESSING",
    creator: userId,
    files: uploadedFiles.map((file) => file.data),
    participants,
    notes,
    date: Timestamp.fromDate(date),
    createdAt: serverTimestamp(),
  });

  // let gemini do its magic

  // add all files to the gemini request
  const fileParts: Part[] = await Promise.all(
    uploadedFiles.map(async ({ data, file }) => {
      if (file.size < 20 * 1024 * 1024) {
        return await fileToGenerativePart(file);
      }

      return {
        fileData: { mimeType: data.mimeType, fileUri: data.storagePath },
      };
    })
  );

  // generate enviromental report
  const prompt = `Please put together an enviromental analytic report for this meeting. Here is the meeting data and any attached meeting files: ${JSON.stringify(
    { meetingName, participants, date, notes }
  )}`;
  const geminiResult = await geminiFlash({
    withReportFormatting: true,
  }).generateContent([prompt, ...fileParts]);

  const response = geminiResult.response;
  const text = response.text();

  // update meeting with enviromental report
  updateDoc(meetingDoc, { enviromentalReport: text, status: "DONE" });

  // return meeting id
  return meetingDoc.id;
};
