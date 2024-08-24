import { meetingsCollection } from "database/db";
import { doc, getDoc } from "firebase/firestore";
import { FetchedMeeting } from "types/MeetingTypes";
import { getUserById } from "./getUserById";

export const getMeetingById = async (
  id: string
): Promise<FetchedMeeting | null> => {
  const docSnapshot = await getDoc(doc(meetingsCollection, id));
  const meetingData = docSnapshot.data();
  if (!meetingData) return null;

  const creatorId = meetingData.creator;
  let creatorName = "Unknown";
  let creatorEmail = "Unknown";

  // Fetch the creator's email
  const user = await getUserById(creatorId);

  if (user) {
    creatorName = user.displayName;
    creatorEmail = user.email;
  }

  return {
    id: docSnapshot.id,
    creatorName,
    creatorEmail,
    ...meetingData,
    date: meetingData.date.toDate(),
    createdAt: meetingData.createdAt.toDate(),
  };
};
