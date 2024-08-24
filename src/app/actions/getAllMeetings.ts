import { meetingsCollection } from "database/db";
import { getDocs, orderBy, query } from "firebase/firestore";
import { FetchedMeeting } from "types/MeetingTypes";
import { getUserById } from "./getUserById";

export const getAllMeetings = async () => {
  const meetings: FetchedMeeting[] = [];
  const querySnapshot = await getDocs(
    query(meetingsCollection, orderBy("date", "desc"))
  );

  for (const docSnapshot of querySnapshot.docs) {
    const meetingData = docSnapshot.data();
    const creatorId = meetingData.creator;
    let creatorName = "Unknown";
    let creatorEmail = "Unknown";

    // Fetch the creator
    const user = await getUserById(creatorId);

    if (user) {
      creatorName = user.displayName;
      creatorEmail = user.email;
    }

    meetings.push({
      id: docSnapshot.id,
      creatorName,
      creatorEmail,
      ...meetingData,
      date: meetingData.date.toDate(),
      createdAt: meetingData.createdAt.toDate(),
    });
  }

  return meetings;
};
