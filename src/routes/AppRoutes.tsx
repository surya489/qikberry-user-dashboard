import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import NotFoundPage from "../pages/NotFound";
import PhotosPage from "../pages/Photos";
import PostsPage from "../pages/Posts";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Home Layout */}
                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="posts" element={<PostsPage />} />
                    <Route path="photos" element={<PhotosPage />} />
                </Route>

                {/* 404 Page Layout */}
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;