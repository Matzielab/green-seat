import { MeetingForm } from "app/components/MeetingForm";
import { MeetingFromFilesForm } from "app/components/MeetingFromFilesForm";
import { PageTitleAndDescription } from "app/components/PageTitleAndDescription";
import dayjs from "dayjs";
import { useState } from "react";

export const CreateMeetingFromFilesScreen = () => {
  const [meetingData, setMeetingData] = useState<{
    meetingName?: string;
    participants?: string[];
    summary?: string;
    date?: string;
    files?: FileList;
  } | null>(null);

  return (
    <div>
      <PageTitleAndDescription
        title="New Meeting"
        description="Create a new meeting from your meeting attachments. The files will be read and a create meeting form will be filled out for you."
      />
      {meetingData ? (
        <MeetingForm
          meetingName={meetingData.meetingName}
          participants={meetingData.participants}
          notes={meetingData.summary}
          date={
            dayjs(meetingData.date).isValid()
              ? dayjs(meetingData.date).toDate()
              : undefined
          }
          attachments={meetingData.files}
        />
      ) : (
        <MeetingFromFilesForm onMeetingData={setMeetingData} />
      )}
    </div>
  );
};
