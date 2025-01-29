import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchPosts } from "./redux/slices/postSlice.js";
import { loadTheme } from "./redux/slices/themeSlice.js";

import Home from "./pages/home/Home.jsx";
import LatestNews from "./pages/latestNews/LatestNews.jsx";
import GovernmentSchemes from "./pages/governmentSchemes/GovernmentSchemes.jsx";
import JobAndBharati from "./pages/jobAndBharati/JobAndBharati.jsx";
import GR from "./pages/grPage/GR.jsx";
import EducationalInformation from "./pages/educationalInformation/EducationalInformation.jsx";
import OtherInformation from "./pages/otherInformation/OtherInformation.jsx";
import Post from "./pages/post/Post.jsx";

import AdminLayout from "./admin/layout/AdminLayout.jsx";
import Dashboard from "./admin/pages/dashboard/Dashboard.jsx";
import Login from "./admin/authentication/Login.jsx";
import PostManagement from "./admin/pages/posts/PostManagement.jsx";

import ProtectedRoute from "./Routes/ProtectedRoutes/ProtectedRoutes.jsx";
import Layout from "./layout/Layout";
import About from "./pages/About/About.jsx";
import ContactUs from "./pages/Contact/ContactUs.jsx";
import UserManagement from "./admin/pages/userManagement/UserManagement.jsx";

function App() {
  const dispatch = useDispatch();
  const { isLight } = useSelector((state) => state.theme);
  useEffect(() => {
    dispatch(loadTheme());
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (isLight) {
      document.documentElement.style.setProperty("--color-start", "rgb(255, 0, 0 / var(--tw-text-opacity))");
      document.documentElement.style.setProperty("--color-end", "rgb(0, 0, 255 / var(--tw-text-opacity))");
    } else {
      document.documentElement.style.setProperty("--color-start", "rgb(15 23 42 / var(--tw-text-opacity))");
      document.documentElement.style.setProperty("--color-end", "rgb(30 41 59 / var(--tw-text-opacity))");
    }
  }, [isLight]);

  const nestedRoutes = [
    { path: "/latest-news", element: <LatestNews /> },
    { path: "/government-schemes", element: <GovernmentSchemes /> },
    { path: "/job-and-bharati", element: <JobAndBharati /> },
    { path: "/government-gr", element: <GR /> },
    { path: "/educational-information", element: <EducationalInformation /> },
    { path: "/other-information", element: <OtherInformation /> },
    { path: "/about-hindutva-digital", element: <About /> },
    { path: "/contact-us", element: <ContactUs /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Programmatic Nested Routes */}
          {nestedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element}>
              <Route path="post/:id" element={<Post />} />
            </Route>
          ))}

          {/* Standalone Post Route */}
          <Route path="/post/:id" element={<Post />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts-management" element={<PostManagement />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>
        </Route>

        {/* Authentication */}
        <Route path="/login-admin" element={<Login />} />

        {/* Fallback Route */}
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
