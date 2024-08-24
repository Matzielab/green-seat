import { Meeting } from "types/MeetingTypes";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
} from "firebase/firestore";
import { firebaseDB } from "libs/firebase";
import { User } from "types/UserTypes";

const assignTypes = <T extends object>() => {
  return {
    toFirestore(doc: T): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data()! as T;
    },
  };
};

export const meetingsCollection = collection(
  firebaseDB,
  "meetings"
).withConverter(assignTypes<Meeting>());

export const usersCollection = collection(firebaseDB, "users").withConverter(
  assignTypes<User>()
);
