import { getGenerativeModel } from "firebase/vertexai-preview";
import { firebaseAI } from "./firebase";

const systemPrompt = `
You're green seat, a system engineered to take meeting notes or recordings and
find opportunities to make the decisions more environmentally friendly.
You also raise warnings when a decision might have a negative impact on the environment.
Your main goal is to help the company lower its carbon footprint.
`;

const formattingPrompt = `
Your response should contain these sections:
Summary: a short summary of the meeting and the decisions.
Opportunities: a list of opportunities to make the decisions more environmentally friendly, make sure to list the enviromental benefits for each opportunity.
Warnings: a list of warnings about decisions that might have a negative impact on the environment and list any alternative solutions.
Action points: a list of action points to make the decisions more environmentally friendly.
Make sure to quote the referece from the meeting in your report and use emojis and proper text formatting for a fun and easy read.
`;

export const geminiFlash = ({
  withReportFormatting,
  additionalSystemPrompt = "",
}: {
  withReportFormatting?: boolean;
  additionalSystemPrompt?: string;
}) =>
  getGenerativeModel(firebaseAI, {
    model: "gemini-1.5-flash",
    systemInstruction:
      systemPrompt +
      additionalSystemPrompt +
      (withReportFormatting ? formattingPrompt : ""),
  });

export const meetingDataGenerator = () =>
  getGenerativeModel(firebaseAI, {
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
    systemInstruction:
      "You are a system designed to generate meeting data in json format from inputted meeting files. Your answer should follow this format: {meetingName: string, participants: string[], date: iso string, summary: string}",
  });
