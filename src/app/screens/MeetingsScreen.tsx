import React from "react";
import dayjs from "dayjs";
import { useAllMeetings } from "hooks/useAllMeetings";
import { LoadingIndicator } from "app/components/LoadingIndicator";
import { Badge } from "app/components/Badge";
import { capitalizeEveryWord } from "libs/capitalizeEveryWord";
import { PageTitleAndDescription } from "app/components/PageTitleAndDescription";

export const MeetingsScreen = () => {
  const { isLoading, meetings } = useAllMeetings();

  return (
    <>
      <PageTitleAndDescription
        title="All Meetings"
        description="A list of all the saved and uploaded meetings."
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <LoadingIndicator size="large" />
                </div>
              ) : meetings.length < 1 ? (
                <EmptyState />
              ) : (
                <table className="min-w-full divide-y divide-gray-600">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-50 sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50"
                      >
                        Creator
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-50"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {meetings.map((meeting) => (
                      <tr key={meeting.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-50 sm:pl-6 lg:pl-8">
                          {meeting.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-50">
                          <Badge
                            text={meeting.status}
                            variant={
                              meeting.status === "DONE" ? "success" : "warning"
                            }
                            rounded
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-50">
                          {capitalizeEveryWord(meeting.creatorName)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-50">
                          {dayjs(meeting.date).format("ddd D MMM YYYY")}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <a
                            href={`/app/meeting/${meeting.id}`}
                            className="text-emerald-400 hover:text-emerald-300"
                          >
                            View
                            <span className="sr-only">, {meeting.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EmptyState = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <p className="text-gray-50">No meetings found.</p>
    </div>
  );
};
