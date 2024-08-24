import { Timestamp } from "firebase/firestore";

export type User = {
  email: string;
  displayName: string;
  photoURL?: string;
  lastLogin: Timestamp;
};

export type FetchedUser = Omit<User, "lastLogin"> & {
  id: string;
  lastLogin: Date;
};
