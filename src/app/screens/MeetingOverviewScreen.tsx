import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { FourOhFourPage } from "navigation/404Page";
import { useMeetingById } from "hooks/useMeetingById";
import { LoadingIndicator } from "app/components/LoadingIndicator";
import dayjs from "dayjs";
import { Badge } from "app/components/Badge";
import { fileSizeToHumanReadable } from "libs/fileSizeToHumanReadable";
import { GeneratedEnviromentalReport } from "app/components/GeneratedEnviromentalReport";
import { capitalizeEveryWord } from "libs/capitalizeEveryWord";
import { downloadFileFromStorage } from "app/actions/downloadFileFromStorage";
import { MeetingChat } from "app/components/MeetingChat";

export const MeetingOverviewScreen = () => {
  const { id } = useParams();
  const { meeting, isLoading } = useMeetingById(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingIndicator size="large" />
      </div>
    );
  } else if (!meeting || !id) {
    return <FourOhFourPage />;
  }

  const goToAttachment = (path: string) => {
    downloadFileFromStorage(path).then((url) => {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.download = path.split("/").pop() || "";
      a.click();
    });
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold leading-7 text-gray-50">
          {meeting.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
          {dayjs(meeting.date).format("dddd, MMMM D, YYYY")}
        </p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-600 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-50">
              Created by
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-100 sm:mt-2">
              {meeting.creatorEmail !== "Unknown" ? (
                <a
                  href={`mailto:${meeting.creatorEmail}`}
                  className="underline"
                >
                  {capitalizeEveryWord(meeting.creatorName)}
                </a>
              ) : (
                capitalizeEveryWord(meeting.creatorName)
              )}
            </dd>
          </div>
          <div className="border-t border-gray-600 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-50">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-100 sm:mt-2">
              <Badge
                text={meeting.status}
                variant={meeting.status === "DONE" ? "success" : "warning"}
                rounded
              />
            </dd>
          </div>

          {meeting.participants && (
            <div className="border-t border-gray-600 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-50">
                Participants
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-100 sm:mt-2">
                {meeting.participants
                  .map((participant) => capitalizeEveryWord(participant))
                  .join(", ")}
              </dd>
            </div>
          )}

          {meeting.notes && (
            <div className="border-t border-gray-600 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-50">
                Notes
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-100 sm:mt-2">
                {meeting.notes}
              </dd>
            </div>
          )}

          {meeting.files && meeting.files.length > 0 && (
            <div className="border-t border-gray-600 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-50">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-50">
                <ul className="divide-y divide-gray-100 rounded-md border border-gray-500">
                  {meeting.files.map((file) => (
                    <li
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      key={file.name}
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {file.name}
                          </span>
                          <span className="flex-shrink-0 text-gray-400">
                            {fileSizeToHumanReadable(file.fileSize)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => goToAttachment(file.storagePath)}
                          className="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                          View
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {meeting.enviromentalReport && (
            <GeneratedEnviromentalReport report={meeting.enviromentalReport} />
          )}
        </dl>
        <MeetingChat meeting={meeting} />
      </div>
    </div>
  );
};
