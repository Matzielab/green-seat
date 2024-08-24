import { deleteObject, ref } from "firebase/storage";
import { firebaseStorage } from "libs/firebase";

export const deleteStorageFile = async (storagePath: string) => {
  const fileRef = ref(firebaseStorage, storagePath);

  return deleteObject(fileRef);
};
