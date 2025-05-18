"use client"

import { useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import AdminUsers from "../components/admin/AdminUsers"
import AdminTags from "../components/admin/AdminTags"
import "./AdminPage.css"

const AdminPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname.includes("tags") ? "tags" : "users")

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    navigate(`/admin/${tab === "users" ? "" : tab}`)
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>관리자 페이지</h1>
      </div>

      <div className="admin-container">
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabClick("users")}
          >
            회원 관리
          </button>
          <button
            className={`tab-button ${activeTab === "tags" ? "active" : ""}`}
            onClick={() => handleTabClick("tags")}
          >
            태그 관리
          </button>
        </div>

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<AdminUsers />} />
            <Route path="/tags" element={<AdminTags />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
