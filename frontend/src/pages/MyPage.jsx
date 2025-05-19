"use client"

import { useState, useEffect, useContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { getUserInfo } from "../utils/storage"
import UserInfo from "../components/mypage/UserInfo"
import ProfileEdit from "../components/mypage/ProfileEdit"
import ReceivedApplications from "../components/mypage/ReceivedApplications"
import SentApplications from "../components/mypage/SentApplications"
import MyRecruitments from "../components/mypage/MyRecruitments"
import "./MyPage.css"

const MyPage = () => {
  const user = getUserInfo()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("profile")

  // 관리자 여부 확인
  const isAdmin = user?.role === "ROLE_ADMIN"

  useEffect(() => {
    const path = location.pathname.split("/").pop()
    if (path === "mypage" || path === "") {
      setActiveTab("profile")
    } else {
      setActiveTab(path)
    }
  }, [location.pathname])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    navigate(`/mypage/${tab === "profile" ? "" : tab}`)
  }

  // 관리자 페이지로 이동하는 핸들러
  const handleAdminClick = () => {
    navigate("/admin")
  }

  return (
    <div className="mypage">
      <div className="mypage-container">
        <aside className="mypage-sidebar">
          <div className="user-brief">
            <div className="user-avatar">
              <img src={user?.imageUrl || "/placeholder-avatar.png"} alt={user?.nickname} />
            </div>
            <h3>{user?.nickname}</h3>
            <p>{user?.role === "ROLE_IP" ? "IP 제공자" : user?.role === "ROLE_ADMIN" ? "관리자" : "점주"}</p>
          </div>

          <nav className="mypage-nav">
            <ul>
              <li className={activeTab === "profile" ? "active" : ""}>
                <button onClick={() => handleTabClick("profile")}>회원정보</button>
              </li>
              <li className={activeTab === "profile-edit" ? "active" : ""}>
                <button onClick={() => handleTabClick("profile-edit")}>프로필 편집</button>
              </li>
              <li className={activeTab === "my-recruitments" ? "active" : ""}>
                <button onClick={() => handleTabClick("my-recruitments")}>작성한 모집 공고</button>
              </li>
              <li className={activeTab === "received-applications" ? "active" : ""}>
                <button onClick={() => handleTabClick("received-applications")}>받은 제안 목록</button>
              </li>
              <li className={activeTab === "sent-applications" ? "active" : ""}>
                <button onClick={() => handleTabClick("sent-applications")}>보낸 제안 목록</button>
              </li>
              {/* 관리자인 경우에만 관리자 메뉴 표시 */}
              {isAdmin && (
                <li className="admin-menu-item">
                  <button onClick={handleAdminClick}>관리자 페이지</button>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    if (window.confirm("로그아웃 하시겠습니까?")) {
                      // Handle logout
                      navigate("/")
                    }
                  }}
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="mypage-content">
          <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/my-recruitments" element={<MyRecruitments />} />
            <Route path="/received-applications" element={<ReceivedApplications />} />
            <Route path="/sent-applications" element={<SentApplications />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default MyPage
