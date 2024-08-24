import dayjs from "dayjs";
import { ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "libs/firebase";

export const uploadMeetingFiles = async (
  files: FileList | File[],
  meetingData: { date: Date; name: string }
) => {
  const uploadedFiles = await Promise.all(
    Array.from(files).map(async (file) => {
      const fileName = `${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")}-${
        file.name
      }`;
      const filePath = `meeting-attachments/${dayjs(meetingData.date).format(
        "YYYY-MM-DD"
      )}/${meetingData.name}/${fileName}`;
      const storageRef = ref(firebaseStorage, filePath);
      await uploadBytes(storageRef, file);
      return {
        data: {
          name: file.name,
          mimeType: file.type,
          path: filePath,
          storagePath: storageRef.toString(),
          fileSize: file.size,
        },
        file,
      };
    })
  );

  return uploadedFiles;
};

export const uploadFiles = async (files: FileList | File[], path: string) => {
  const uploadedFiles = await Promise.all(
    Array.from(files).map(async (file) => {
      const fileName = `${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")}-${
        file.name
      }`;
      const filePath = `${path}/${dayjs().format("YYYY-MM-DD")}/${fileName}`;
      const storageRef = ref(firebaseStorage, filePath);
      await uploadBytes(storageRef, file);

      return {
        data: {
          name: file.name,
          mimeType: file.type,
          path: filePath,
          storagePath: storageRef.toString(),
          fileSize: file.size,
        },
        file,
      };
    })
  );

  return uploadedFiles;
};
