import {
  DocumentTextIcon,
  GlobeAmericasIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Comprehensive Meeting Management",
    description:
      "Easily create, organize, and track meetings. Capture notes, attendees, dates, attachments, actions and decisions in one central location.",
    href: "#",
    icon: DocumentTextIcon,
  },
  {
    name: "Environmental Impact Reports",
    description:
      "Generate detailed eco-reports after each meeting, highlighting opportunities to lower your carbon footprint.",
    href: "#",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Secure & Open Source",
    description:
      "Enjoy the flexibility of open-source software with the security of Google account login. Easy to setup and host yourself on firebase.",
    href: "#",
    icon: LockClosedIcon,
  },
];

export const FeatureSection = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Empower Your Meetings with Environmental Intelligence
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Transform your decision-making process with our eco-smart meeting
            management tool. Organize efficiently, collaborate effectively, and
            make environmentally conscious choices - all in one platform.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
