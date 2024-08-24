import { useEffect, useState } from "react";
import { getMeetingById } from "app/actions/getMeetingById";
import { FetchedMeeting } from "types/MeetingTypes";

export const useMeetingById = (id: string) => {
  const [meeting, setMeeting] = useState<FetchedMeeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMeetingById(id)
      .then((meeting) => {
        setMeeting(meeting);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return { meeting, isLoading };
};
