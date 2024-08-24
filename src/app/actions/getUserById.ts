import { usersCollection } from "database/db";
import { doc, getDoc } from "firebase/firestore";
import { FetchedUser } from "types/UserTypes";

export const getUserById = async (id: string): Promise<FetchedUser | null> => {
  const docSnapshot = await getDoc(doc(usersCollection, id));
  const userData = docSnapshot.data();
  if (!userData) return null;

  return {
    id: docSnapshot.id,
    ...userData,
    lastLogin: userData.lastLogin.toDate(),
  };
};
