import { LoginWithGoogleButton } from "./LoginWithGoogleButton";

export const CTAFooter = () => {
  return (
    <div className="bg-emerald-800">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
          Let's create a greener future together.
          <br />
          Start your first meeting!
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <LoginWithGoogleButton />
        </div>
      </div>
    </div>
  );
};
