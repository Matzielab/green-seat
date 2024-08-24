import { useEffect, useState } from "react";
import { getAllMeetings } from "app/actions/getAllMeetings";
import { FetchedMeeting } from "types/MeetingTypes";

export const useAllMeetings = () => {
  const [meetings, setMeetings] = useState<FetchedMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllMeetings()
      .then((allMeetings) => {
        setMeetings(allMeetings);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { meetings, isLoading };
};
