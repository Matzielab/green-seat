import { meetingsCollection } from "database/db";
import { getDocs } from "firebase/firestore";
import dayjs from "dayjs";

export type DashboardData = {
  totalMeetings: number;
  totalFiles: number;
  createdByMe: number;
  createdThisWeek: number;
  createdThisMonth: number;
  numberOfEnvironmentalReports: number;
  meetingsOverTime: {
    labels: string[];
    data: number[];
  };
};

export const getDashboardData = async (
  currentUserId: string
): Promise<DashboardData> => {
  const now = dayjs();
  const oneWeekAgo = now.subtract(7, "day");
  const oneMonthAgo = now.subtract(1, "month");

  const meetingsSnapshot = await getDocs(meetingsCollection);
  const meetings = meetingsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const totalMeetings = meetings.length;
  const totalFiles = meetings.reduce(
    (sum, meeting) => sum + (meeting.files?.length || 0),
    0
  );
  const createdByMe = meetings.filter(
    (meeting) => meeting.creator === currentUserId
  ).length;
  const createdThisWeek = meetings.filter((meeting) =>
    dayjs(meeting.createdAt.toDate()).isAfter(oneWeekAgo)
  ).length;
  const createdThisMonth = meetings.filter((meeting) =>
    dayjs(meeting.createdAt.toDate()).isAfter(oneMonthAgo)
  ).length;

  // Calculate number of environmental reports
  const numberOfEnvironmentalReports = meetings.filter(
    (meeting) =>
      meeting.enviromentalReport && meeting.enviromentalReport.trim() !== ""
  ).length;

  // Calculate meetings over time (last 6 months)
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    return now.subtract(i, "month").format("MMM");
  }).reverse();

  const meetingsOverTime = lastSixMonths.map((month, index) => {
    const startOfMonth = now.subtract(5 - index, "month").startOf("month");
    const endOfMonth = startOfMonth.endOf("month");
    return meetings.filter((meeting) => {
      const meetingDate = dayjs(meeting.createdAt.toDate());
      return (
        meetingDate.isAfter(startOfMonth) && meetingDate.isBefore(endOfMonth)
      );
    }).length;
  });

  return {
    totalMeetings,
    totalFiles,
    createdByMe,
    createdThisWeek,
    createdThisMonth,
    numberOfEnvironmentalReports,
    meetingsOverTime: {
      labels: lastSixMonths,
      data: meetingsOverTime,
    },
  };
};
