import { MeetingForm } from "app/components/MeetingForm";
import { PageTitleAndDescription } from "app/components/PageTitleAndDescription";

export const CreateMeetingScreen = () => {
  return (
    <div>
      <PageTitleAndDescription
        title="New Meeting"
        description="Create a new meeting by filling out the form below. Once the meeting is created an environmental report will be created for it."
      />
      <MeetingForm />
    </div>
  );
};
