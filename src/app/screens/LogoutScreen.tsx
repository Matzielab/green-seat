import { useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LogoutScreen = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signOut().then(() => {
      navigate("/");
    });
  }, [signOut, navigate]);

  return null;
};
