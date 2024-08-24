import React from "react";
import { useAuth } from "hooks/useAuth";

export const LoginWithGoogleButton = () => {
  const { user, signIn, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) {
    return (
      <a
        href="/app"
        className="bg-emerald-500 px-4 py-2 border flex gap-2 border-emerald-600 dark:border-emerald-400 rounded-lg text-white hover:bg-emerald-600 hover:border-emerald-700 hover:shadow transition duration-150"
      >
        {user.photoURL && (
          <img
            className="w-6 h-6 rounded-full"
            src={user.photoURL}
            loading="lazy"
            alt="user profile"
          />
        )}
        <span>Go to App</span>
      </a>
    );
  }

  return (
    <button
      onClick={signIn}
      className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-gray-700 rounded-lg text-gray-700  hover:border-slate-400  hover:text-gray-800  hover:shadow transition duration-150"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Sign in with Google</span>
    </button>
  );
};
