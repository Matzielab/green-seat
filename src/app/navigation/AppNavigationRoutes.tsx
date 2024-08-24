import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { SidebarLayout } from "app/layouts/SidebarLayout";
import { CreateMeetingFromFilesScreen } from "app/screens/CreateMeetingFromFilesScreen";
import { MeetingsScreen } from "app/screens/MeetingsScreen";
import { LogoutScreen } from "app/screens/LogoutScreen";
import { MeetingOverviewScreen } from "app/screens/MeetingOverviewScreen";
import { CreateMeetingScreen } from "app/screens/CreateMeetingScreen";
import { DashboardScreen } from "app/screens/DashboardScreen";
import { hasAllowedAuth } from "libs/hasAllowedAuth";

export const AppNavigationRoutes = () => {
  const { user, isLoading, signOut } = useAuth();

  if (!isLoading && !user) {
    return <Navigate to="/" />;
  } else if (!isLoading && !hasAllowedAuth(user?.email || "")) {
    if (user) signOut();
    return <Navigate to="/unauthorized" />;
  }

  return (
    <SidebarLayout>
      <Routes>
        <Route index element={<DashboardScreen />} />
        <Route
          path="/create-meeting-from-files"
          element={<CreateMeetingFromFilesScreen />}
        />
        <Route path="/create-meeting" element={<CreateMeetingScreen />} />
        <Route path="/meetings" element={<MeetingsScreen />} />
        <Route path="/meeting/:id" element={<MeetingOverviewScreen />} />
        <Route path="/logout" element={<LogoutScreen />} />
      </Routes>
    </SidebarLayout>
  );
};
