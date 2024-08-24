import { Timestamp } from "firebase/firestore";

export type Meeting = {
  name: string;
  status: "CREATED" | "PROCESSING" | "DONE";
  creator: string;
  files?: {
    name: string;
    path: string;
    storagePath: string;
    mimeType: string;
    fileSize: number;
  }[];
  participants?: string[];
  notes?: string;
  date: Timestamp;
  createdAt: Timestamp;
  enviromentalReport?: string;
};

export type FetchedMeeting = Omit<Meeting, "createdAt" | "date"> & {
  id: string;
  creatorName: string;
  creatorEmail: string;
  date: Date;
  createdAt: Date;
};
