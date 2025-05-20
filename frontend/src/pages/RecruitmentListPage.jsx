"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { recruitmentAPI } from "../api"
import axios from "axios"
import { getAccessToken } from "../utils/storage"
import RecruitmentDetailModal from "../components/RecruitmentDetailModal"
import ProfileDetailModal from "../components/ProfileDetailModal"
import "./RecruitmentListPage.css"

const RecruitmentListPage = () => {
  const navigate = useNavigate()
  const [recruitments, setRecruitments] = useState([])
  const [filteredRecruitments, setFilteredRecruitments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecruitment, setSelectedRecruitment] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [profileType, setProfileType] = useState("all")

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      alert("로그인이 필요한 서비스입니다.")
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    fetchRecruitments()
  }, [sort])

  useEffect(() => {
    let filteredData = Array.isArray(recruitments) ? [...recruitments] : []
    if (filter !== "all") {
      filteredData = filteredData.filter((recruitment) => recruitment.status === filter)
    }
    if (profileType !== "all") {
      filteredData = filteredData.filter((recruitment) => recruitment.profile.type === profileType)
    }
    setFilteredRecruitments(filteredData)
  }, [profileType, recruitments, filter])

  const fetchRecruitments = async () => {
    try {
      setLoading(true)
      const sortMapping = {
        newest: "createdAt,desc",
        oldest: "createdAt,asc",
        deadline: "deadline,asc"
      }
      const params = {
        status: filter !== "all" ? filter : undefined,
        sort: sortMapping[sort]
      }
      const response = await recruitmentAPI.getRecruitments(params)
      const data = response.data?.content || []
      setRecruitments(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("🔥 모집글 불러오기 실패:", error)
      setRecruitments([])
    } finally {
      setLoading(false)
    }
  }

  const handleRecruitmentClick = (recruitment, e) => {
    e.stopPropagation()
    setSelectedRecruitment(recruitment)
    setShowRecruitmentModal(true)
  }

  const handleProfileClick = async (profileId, e) => {
    e.stopPropagation()
    console.log("요청할 profileId:", profileId)
    try {
      const response = await axios.get(`http://localhost:8080/api/profiles/${profileId}`)
      setSelectedProfile(response.data)
      setShowProfileModal(true)
    } catch (error) {
      console.error("프로필 상세 조회 실패:", error)
      alert("프로필 상세 정보를 불러올 수 없습니다.")
    }
  }

  const handleFilterChange = (e) => setFilter(e.target.value)
  const handleSortChange = (e) => setSort(e.target.value)
  const handleProfileTypeChange = (type) => setProfileType(type)

  const getStatusLabel = (status) => {
    switch (status) {
      case "RECRUITING": return "모집중"
      case "COMPLETED": return "매칭완료"
      case "CLOSED": return "마감됨"
      default: return "알 수 없음"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  return (
    <div className="recruitment-list-page">
      <div className="page-header">
        <h1>모집 게시판</h1>
        <Link to="/recruitment/create" className="btn btn-primary">모집글 작성</Link>
      </div>

      <div className="filter-section">
        <div className="profile-type-filter">
          <button className={`btn ${profileType === "all" ? "btn-primary" : ""}`} onClick={() => handleProfileTypeChange("all")}>전체</button>
          <button className={`btn ${profileType === "STORE" ? "btn-recruitment" : ""}`} onClick={() => handleProfileTypeChange("STORE")}>매장</button>
          <button className={`btn ${profileType === "IP" ? "btn-ip" : ""}`} onClick={() => handleProfileTypeChange("IP")}>IP 캐릭터</button>
        </div>

        <div className="filter-controls">
          <select value={filter} onChange={handleFilterChange} className="form-control">
            <option value="all">전체</option>
            <option value="RECRUITING">모집중</option>
            <option value="COMPLETED">매칭완료</option>
            <option value="CLOSED">마감됨</option>
          </select>

          <select value={sort} onChange={handleSortChange} className="form-control">
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="deadline">마감임박순</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : filteredRecruitments.length === 0 ? (
        <div className="no-recruitments">
          <p>모집글이 없습니다.</p>
          <Link to="/recruitment/create" className="btn btn-primary">첫 모집글 작성하기</Link>
        </div>
      ) : (
        <div className="recruitments-grid">
          {filteredRecruitments.map((recruitment) => {
            const isIP = recruitment.profile.type === "IP"
            const statusLabel = getStatusLabel(recruitment.status)

            return (
              <div key={recruitment.id} className="recruitment-card" onClick={(e) => handleRecruitmentClick(recruitment, e)}>
                <div className={`recruitment-tag ${isIP ? "ip-tag" : "store-tag"}`}>{isIP ? "IP캐릭터모집" : "매장모집"}</div>
                <div className="recruitment-status">{statusLabel}</div>
                <h2 className="recruitment-title">{recruitment.title}</h2>
                <div className="recruitment-info">
                  {!isIP && (
                    <div className="info-item location">
                      <span className="icon">📍</span>
                      <span>{recruitment.profile?.address?.sido ?? ""} {recruitment.profile?.address?.sigungu ?? ""}</span>
                    </div>
                  )}
                  <div className="info-item registration-date">
                    <span className="icon">📅</span>
                    <span>등록일: {formatDate(recruitment.createdAt)}</span>
                  </div>
                  <div className="info-item deadline">
                    <span className="icon">⏰</span>
                    <span>마감일: {formatDate(recruitment.deadline)}</span>
                  </div>
                </div>
                <div className="recruitment-footer">
                  <div className="profile-info">
                    <img src={recruitment.profile.imageUrl || "/placeholder-profile.png"} alt={recruitment.profile.name} />
                    <div className="profile-details">
                      <div className="profile-name">{recruitment.profile.name}</div>
                    </div>
                  </div>
                  <button className="detail-button" onClick={(e) => handleProfileClick(recruitment.profile.profileId, e)}>
                    상세보기
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showRecruitmentModal && selectedRecruitment && (
        <RecruitmentDetailModal recruitment={selectedRecruitment} onClose={() => setShowRecruitmentModal(false)} />
      )}

      {showProfileModal && selectedProfile && (
        <ProfileDetailModal profile={selectedProfile} onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  )
}

export default RecruitmentListPage
