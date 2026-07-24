import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import PhotosPage from "@/pages/Photos";
import PostsPage from "@/pages/Posts";
import ProfilePage from "@/pages/Profile";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { ROUTES } from "@/utils/constants";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.login} replace />} />
        <Route path={ROUTES.login} element={<LoginPage />} />

        <Route
          path={ROUTES.home}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.posts}
          element={
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.photos}
          element={
            <ProtectedRoute>
              <PhotosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
