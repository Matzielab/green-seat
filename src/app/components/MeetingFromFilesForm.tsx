import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "hooks/useAuth";
import { Button } from "app/components/Button";
import { getMeetingDataFromFiles } from "app/actions/getMeetingDataFromFiles";
import { MultiFileInput } from "./MultiFileInput";

export const meetingFromFilesFormSchema = z.object({
  files: z.instanceof(FileList).refine((fileList) => fileList.length > 0, {
    message: "At least one file is required",
  }),
});

export type MeetingFromFilesFormData = z.infer<
  typeof meetingFromFilesFormSchema
>;

type Props = {
  onMeetingData: (data: {
    meetingName?: string;
    participants?: string[];
    date?: string;
    summary?: string;
    files: FileList;
  }) => void;
};

export const MeetingFromFilesForm = ({ onMeetingData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<MeetingFromFilesFormData>({
    resolver: zodResolver(meetingFromFilesFormSchema),
  });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: MeetingFromFilesFormData) => {
    console.log("Meeting:", data);
    if (!user) return;

    try {
      setIsLoading(true);
      const meetingData = await getMeetingDataFromFiles(data);
      onMeetingData({ ...meetingData, files: data.files });
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
      <MultiFileInput
        label="Meeting notes"
        registration={register("files", { required: "Notes are required" })}
        reset={() => resetField("files")}
        setValue={(value) => setValue("files", value)}
        error={errors.files?.message}
      />

      <Button
        type="submit"
        text="Create new meeting"
        isLoading={isLoading}
        fullWidth
      />
    </form>
  );
};
