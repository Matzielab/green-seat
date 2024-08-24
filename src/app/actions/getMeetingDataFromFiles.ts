import { MeetingFromFilesFormData } from "app/components/MeetingFromFilesForm";
import { Part } from "firebase/vertexai-preview";
import { meetingDataGenerator } from "libs/gemini";
import { fileToGenerativePart } from "libs/geminiMappers";
import { uploadFiles } from "./uploadMeetingFiles";
import { deleteStorageFile } from "./deleteStorageFile";

export const getMeetingDataFromFiles = async (
  data: MeetingFromFilesFormData
) => {
  // sort files to an object called big and small where big files are larger than 20MB
  const sortedFiles = Array.from(data.files).reduce(
    (acc, file) => {
      if (file.size < 20 * 1024 * 1024) {
        acc.small.push(file);
      } else {
        acc.big.push(file);
      }
      return acc;
    },
    { big: [] as File[], small: [] as File[] }
  );

  const uploadedFiles = await uploadFiles(sortedFiles.big, "tmp");
  const bigFilesParts = await Promise.all(
    uploadedFiles.map(async (file) => {
      return {
        fileData: {
          mimeType: file.data.mimeType,
          fileUri: file.data.storagePath,
        },
      };
    })
  );

  const smallFilesParts = await Promise.all(
    sortedFiles.small.map(async (file) => {
      return await fileToGenerativePart(file);
    })
  );

  // add all files to the gemini request
  const fileParts: Part[] = [...bigFilesParts, ...smallFilesParts];
  console.log(fileParts);
  try {
    const prompt =
      "Please generate the meeting data json based on these attachments.";
    const geminiResult = await meetingDataGenerator().generateContent([
      prompt,
      ...fileParts,
    ]);

    const response = geminiResult.response;
    const text = response.text();

    return JSON.parse(text) as {
      meetingName?: string;
      participants?: string[];
      summary?: string;
      date?: string;
    };
  } catch (error) {
    if (uploadedFiles.length > 0) {
      // remove the temporary files
      uploadedFiles.map(async (file) => {
        deleteStorageFile(file.data.storagePath);
      });
    }
    throw error;
  }
};
