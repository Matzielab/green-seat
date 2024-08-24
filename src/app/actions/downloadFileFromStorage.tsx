import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "libs/firebase";

export const downloadFileFromStorage = async (path: string) => {
  const fileRef = ref(firebaseStorage, path);

  const url = await getDownloadURL(fileRef);
  console.log(url);
  return url;
};
