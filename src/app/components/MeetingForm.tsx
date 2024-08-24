import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "hooks/useAuth";
import { Button } from "app/components/Button";
import { DatePicker } from "./DatePicker";
import { ParticipantsInput } from "./ParticipantsInput";
import { TextArea } from "./TextArea";
import { createNewMeeting } from "app/actions/createNewMeeting";
import { useNavigate } from "react-router-dom";
import { TextInput } from "./TextInput";
import { MultiFileInput } from "./MultiFileInput";

export const meetingFormSchema = z.object({
  meetingName: z.string().min(1, "Meeting name is required"),
  participants: z.array(z.string()),
  date: z.coerce.date().default(() => new Date()),
  notes: z.string(),
  attachments: z.instanceof(FileList),
});

export type MeetingFormData = z.infer<typeof meetingFormSchema>;

export const MeetingForm = (props: Partial<MeetingFormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: props,
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: MeetingFormData) => {
    console.log("Meeting:", data);

    if (!user) return;

    try {
      setIsLoading(true);
      const meetingId = await createNewMeeting({ ...data, userId: user.uid });
      navigate(`/app/meeting/${meetingId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto mt-8"
    >
      <div className="flex flex-row gap-2">
        <div className="flex-1 md:flex-[2_2_0%]">
          <TextInput
            label="Meeting name"
            registration={register("meetingName")}
            error={errors.meetingName?.message}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </div>
        <div className="flex-1">
          <DatePicker
            label="Date"
            defaultValue={props.date}
            registration={register("date")}
            error={errors.date?.message}
          />
        </div>
      </div>

      <ParticipantsInput
        label="Participants"
        registration={register("participants")}
        defaultValue={props.participants}
        error={errors.participants?.message}
      />

      <TextArea
        label="Notes"
        registration={register("notes")}
        error={errors.notes?.message}
        placeholder="Enter any additional notes here..."
        rows={6}
      />

      <MultiFileInput
        label="Attachments"
        registration={register("attachments")}
        reset={() => resetField("attachments")}
        setValue={(value) => setValue("attachments", value)}
        defaultFiles={
          props.attachments ? Array.from(props.attachments) : undefined
        }
        error={errors.attachments?.message}
      />

      <Button
        type="submit"
        text="Save meeting"
        isLoading={isLoading}
        fullWidth
      />
    </form>
  );
};
