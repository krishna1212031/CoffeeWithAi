import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./AppLayout";
import { HomePage } from "../pages/HomePage/HomePage";

const DashboardPage = lazy(() =>
  import("../pages/DashboardPage/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const LessonPage = lazy(() =>
  import("../pages/LessonPage/LessonPage").then((m) => ({ default: m.LessonPage }))
);
const TutorPage = lazy(() =>
  import("../pages/TutorPage/TutorPage").then((m) => ({ default: m.TutorPage }))
);
const PlaygroundPage = lazy(() =>
  import("../pages/PlaygroundPage/PlaygroundPage").then((m) => ({ default: m.PlaygroundPage }))
);
const CoffeeRecipePage = lazy(() =>
  import("../pages/CoffeeRecipePage/CoffeeRecipePage").then((m) => ({ default: m.CoffeeRecipePage }))
);
const ProfilePage = lazy(() =>
  import("../pages/ProfilePage/ProfilePage").then((m) => ({ default: m.ProfilePage }))
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="lesson" element={<Navigate to="/lesson/intro" replace />} />
        <Route path="lesson/:lessonId" element={<LessonPage />} />
        <Route path="tutor" element={<TutorPage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="recipes" element={<CoffeeRecipePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
