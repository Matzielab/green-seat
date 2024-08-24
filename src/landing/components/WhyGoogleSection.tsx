export const WhyGoogleSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-lg font-semibold leading-8 tracking-tight text-emerald-600">
            Powered by Firebase & Gemini
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
            Why Google?
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-100">
            AI and large language models are known for using lots of energy and
            when selecting a model to make enviromental decisions, it's
            important the model is ran on as little carbon as possible. Google
            is committed to sustainability and has set ambitious goals to
            neutralise their carbon footprint. By using Gemini, we're making
            sure the platform will give intelligent analysises and be powered by
            renewable energy.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <svg
              aria-hidden="true"
              className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
            >
              <defs>
                <pattern
                  id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0.5 0V200M200 0.5L0 0.499983" />
                </pattern>
              </defs>
              <rect
                fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
                width="100%"
                height="100%"
                strokeWidth={0}
              />
            </svg>
            <figure className="border-l border-emerald-600 pl-8">
              <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-50">
                <p>
                  “In 2022 – for the sixth consecutive year – Google matched 100
                  percent of its global annual electricity consumption with
                  purchases of renewable energy.”
                  <br />
                  <br />
                  “in 2020, we set a goal to run on 24/7 carbon-free energy
                  (CFE) on every grid where we operate by 2030”
                </p>
              </blockquote>
              <figcaption className="mt-8 flex gap-x-4">
                <img
                  alt=""
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50 p-1"
                />
                <div className="text-sm leading-6">
                  <div className="font-semibold text-gray-50">
                    Google Data Centers
                  </div>
                  <div className="text-gray-600 hover:text-gray-300 cursor-pointer">
                    <a
                      href="https://www.google.com/about/datacenters/cleanenergy/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-100 lg:col-span-7">
            <p>
              This platform is built on firebase to make it easier to setup and
              host yourself. It was important to make this application as easy
              to host, run, access and modify as possible. Firebase is a great
              choice for this as it's easy to use, has a lot of features and is
              very reliable. It's also an easy to use platform for developers
              which makes it easy to maintain, update and modify.
            </p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-50">
              Want to get modify it for your purpose?
            </h2>
            <p className="mt-6">
              This project is open source and available for all company sizes.
              You can fork the repo and modify it to fit your needs. If you feel
              that any of your changes would be a great addition to the main
              project, feel free to make a pull request. Together we can make
              better enviromental decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
