import { PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  HomeIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { capitalizeEveryWord } from "libs/capitalizeEveryWord";
import GreenSeatLogo from "images/green-seat-logo-text.png";

const navigation = [
  {
    name: "Dashboard",
    href: "/app",
    icon: HomeIcon,
  },
  {
    name: "New meeting",
    href: "/app/create-meeting",
    icon: PlusCircleIcon,
  },
  {
    name: "New meeting from files",
    href: "/app/create-meeting-from-files",
    icon: DocumentPlusIcon,
  },
  {
    name: "All Meetings",
    href: "/app/meetings",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Log out", href: "/app/logout", icon: ArrowLeftStartOnRectangleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div>
        <Dialog
          className="relative z-50 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <a href="/">
                    <img
                      className="h-8 w-auto"
                      src={GreenSeatLogo}
                      alt="Green seat"
                    />
                  </a>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.href === pathname
                                  ? "bg-gray-700 text-emerald-500"
                                  : "text-gray-50 hover:bg-gray-700 hover:text-emerald-500",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.href === pathname
                                    ? "text-emerald-500"
                                    : "text-gray-50 group-hover:text-emerald-500",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-700 bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <a href="/">
                <img
                  className="h-8 w-auto"
                  src={GreenSeatLogo}
                  alt="Green seat"
                />
              </a>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? "bg-gray-700 text-emerald-500"
                              : "text-gray-50 hover:bg-gray-700 hover:text-emerald-500",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href === pathname
                                ? "text-emerald-500"
                                : "text-gray-50 group-hover:text-emerald-500",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-50">
                    {user?.photoURL ? (
                      <img
                        className="h-8 w-8 rounded-full bg-gray-700"
                        src={user.photoURL}
                        alt="your profile"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-700" />
                    )}
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      {capitalizeEveryWord(user?.displayName || "")}
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-50 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-50">
            Dashboard
          </div>

          <span className="sr-only">Your profile</span>
          {user?.photoURL ? (
            <img
              className="h-8 w-8 rounded-full bg-gray-700"
              src={user.photoURL}
              alt="your profile"
            />
          ) : (
            <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-700" />
          )}
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};
