import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FourOhFourPage } from "navigation/404Page";
import { AppNavigationRoutes } from "app/navigation/AppNavigationRoutes";
import { LandingScreen } from "landing/screens/LandingScreen";
import { UnauthorizedScreen } from "landing/screens/UnauthorizedScreen";

export const NavigationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/app/*" element={<AppNavigationRoutes />} />
        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        <Route path="*" element={<FourOhFourPage />} />
      </Routes>
    </BrowserRouter>
  );
};
