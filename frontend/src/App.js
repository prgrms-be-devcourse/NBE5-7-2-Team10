"use client";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import RecruitmentListPage from "./pages/RecruitmentListPage";
import RecruitmentCreatePage from "./pages/RecruitmentCreatePage";
import RecruitmentEditPage from "./pages/RecruitmentEditPage";
import UserTypeSelectionPage from "./pages/UserTypeSelectionPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import LoginCallback from "./pages/LoginCallback";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  // 클라이언트 사이드에서만 렌더링하기 위한 상태
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 즉시 마운트 상태를 true로 설정하여 컴포넌트가 바로 렌더링되도록 합니다
    setIsMounted(true);
  }, []);

  // 서버 사이드 렌더링 시 빈 div 반환
  if (!isMounted) {
    return <div></div>;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<LoginCallback />} />
              <Route path="/signup" element={<UserTypeSelectionPage />} />
              <Route path="/recruitment" element={<RecruitmentListPage />} />
              <Route
                path="/recruitment/create"
                element={
                  <ProtectedRoute>
                    <RecruitmentCreatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruitment/edit/:id"
                element={
                  <ProtectedRoute>
                    <RecruitmentEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mypage/*"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
