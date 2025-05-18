"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { recruitmentAPI, profileAPI } from "../api"
import RecruitmentDetailModal from "../components/RecruitmentDetailModal"
import ProfileDetailModal from "../components/ProfileDetailModal"
import "./RecruitmentListPage.css"

const RecruitmentListPage = () => {
  const [recruitments, setRecruitments] = useState([])
  const [filteredRecruitments, setFilteredRecruitments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecruitment, setSelectedRecruitment] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [profileType, setProfileType] = useState("all") // 프로필 타입 필터

  // sort 변경 시 API 호출
  useEffect(() => {
    fetchRecruitments()
  }, [sort])

  // 클라이언트 필터링
  useEffect(() => {
    let filtered = [...recruitments]

    if (filter !== "all") {
      filtered = filtered.filter((recruitment) => recruitment.status === filter)
    }

    if (profileType !== "all") {
      filtered = filtered.filter((recruitment) => recruitment.profile.type === profileType)
    }

    setFilteredRecruitments(filtered)
  }, [profileType, recruitments, filter])

  const fetchRecruitments = async () => {
    try {
      setLoading(true)
      const params = {
        status: filter !== "all" ? filter : undefined,
        sort,
      }

      const response = await recruitmentAPI.getRecruitments(params)
      setRecruitments(response.data)
    } catch (error) {
      console.error("Error fetching recruitments:", error)

      const dummyRecruitments = [
        {
          id: "dummy-1",
          title: "캐릭터 IP가 필요한 카페 오픈 예정",
          description: "신촌에 위치한 카페입니다. 귀여운 캐릭터와 함께 시즌 메뉴를 출시하고 싶습니다.",
          status: "RECRUITING",
          createdAt: "2025-05-01T00:00:00.000Z",
          deadline: "2025-06-01T00:00:00.000Z",
          region: "서울 강남구",
          profile: {
            id: "profile-1",
            name: "김철수",
            type: "STORE",
            imageUrl: "/placeholder-profile.png",
          },
        },
        {
          id: "dummy-2",
          title: "인기 캐릭터 IP 라이선싱 제공",
          description: "인기 있는 캐릭터입니다. 다양한 매장과의 콜라보레이션을 원합니다.",
          status: "RECRUITING",
          createdAt: "2025-05-05T00:00:00.000Z",
          deadline: "2025-06-15T00:00:00.000Z",
          region: "서울 마포구",
          profile: {
            id: "profile-2",
            name: "이캐릭터",
            type: "IP",
            imageUrl: "/placeholder-profile.png",
          },
        },
        {
          id: "dummy-3",
          title: "캐릭터 카페 창업 IP 파트너 모집",
          description: "부산에 위치한 카페입니다. 캐릭터 IP와 함께 창업하고자 합니다.",
          status: "RECRUITING",
          createdAt: "2025-05-10T00:00:00.000Z",
          deadline: "2025-05-30T00:00:00.000Z",
          region: "부산 해운대구",
          profile: {
            id: "profile-3",
            name: "박사장",
            type: "STORE",
            imageUrl: "/placeholder-profile.png",
          },
        },
        {
          id: "dummy-4",
          title: "신규 캐릭터 IP 런칭 파트너십",
          description: "새롭게 출시된 캐릭터입니다. 첫 콜라보레이션을 함께할 매장을 찾고 있습니다.",
          status: "RECRUITING",
          createdAt: "2025-05-15T00:00:00.000Z",
          deadline: "2025-07-01T00:00:00.000Z",
          region: "경기 성남시",
          profile: {
            id: "profile-4",
            name: "최디자이너",
            type: "IP",
            imageUrl: "/placeholder-profile.png",
          },
        },
        {
          id: "dummy-5",
          title: "마감된 모집 게시글 예시",
          description: "이미 마감된 모집 게시글입니다.",
          status: "CLOSED",
          createdAt: "2025-04-01T00:00:00.000Z",
          deadline: "2025-04-30T00:00:00.000Z",
          region: "인천 연수구",
          profile: {
            id: "profile-5",
            name: "마감된 프로필",
            type: "STORE",
            imageUrl: "/placeholder-profile.png",
          },
        },
      ]

      setRecruitments(dummyRecruitments)
    } finally {
      setLoading(false)
    }
  }

  const handleRecruitmentClick = async (recruitmentId, e) => {
    e.stopPropagation() // 이벤트 버블링 방지

    try {
      const dummyRecruitment = recruitments.find((r) => r.id === recruitmentId)
      if (dummyRecruitment) {
        setSelectedRecruitment(dummyRecruitment)
        setShowRecruitmentModal(true)
        return
      }

      const response = await recruitmentAPI.getRecruitment(recruitmentId)
      setSelectedRecruitment(response.data)
      setShowRecruitmentModal(true)
    } catch (error) {
      console.error("Error fetching recruitment details:", error)
    }
  }

  const handleProfileClick = async (profileId, e) => {
    e.stopPropagation() // 이벤트 버블링 방지

    try {
      // 더미 데이터에서 프로필 찾기
      const recruitment = recruitments.find((r) => r.profile.id === profileId)
      if (recruitment) {
        // 실제 API에서는 프로필 상세 정보를 가져오는 API를 호출해야 함
        // 여기서는 더미 데이터로 대체
        const dummyProfile = {
          ...recruitment.profile,
          description: "프로필 상세 설명입니다.",
          region: recruitment.region,
          tags: [
            { id: "tag1", name: "카페" },
            { id: "tag2", name: "디저트" },
          ],
          collaboCount: Math.floor(Math.random() * 10),
        }

        setSelectedProfile(dummyProfile)
        setShowProfileModal(true)
        return
      }

      // 실제 API 호출
      const response = await profileAPI.getProfile(profileId)
      setSelectedProfile(response.data)
      setShowProfileModal(true)
    } catch (error) {
      console.error("Error fetching profile details:", error)
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const handleProfileTypeChange = (type) => {
    setProfileType(type)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "RECRUITING":
        return "모집중"
      case "COMPLETED":
        return "매칭완료"
      case "CLOSED":
        return "마감됨"
      default:
        return "알 수 없음"
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
        <Link to="/recruitment/create" className="btn btn-primary">
          모집글 작성
        </Link>
      </div>

      <div className="filter-section">
        <div className="profile-type-filter">
          <button
            className={`btn ${profileType === "all" ? "btn-primary" : ""}`}
            onClick={() => handleProfileTypeChange("all")}
          >
            전체
          </button>
          <button
            className={`btn ${profileType === "STORE" ? "btn-recruitment" : ""}`}
            onClick={() => handleProfileTypeChange("STORE")}
          >
            매장
          </button>
          <button
            className={`btn ${profileType === "IP" ? "btn-ip" : ""}`}
            onClick={() => handleProfileTypeChange("IP")}
          >
            IP 캐릭터
          </button>
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
          <Link to="/recruitment/create" className="btn btn-primary">
            첫 모집글 작성하기
          </Link>
        </div>
      ) : (
        <div className="recruitments-grid">
          {filteredRecruitments.map((recruitment) => {
            const isIP = recruitment.profile.type === "IP"
            const statusLabel = getStatusLabel(recruitment.status)

            return (
              <div
                key={recruitment.id}
                className="recruitment-card"
                onClick={(e) => handleRecruitmentClick(recruitment.id, e)}
              >
                <div className={`recruitment-tag ${isIP ? "ip-tag" : "store-tag"}`}>
                  {isIP ? "IP캐릭터모집" : "매장모집"}
                </div>
                <div className="recruitment-status">{statusLabel}</div>
                <h2 className="recruitment-title">{recruitment.title}</h2>

                <div className="recruitment-info">
                  {!isIP && (
                    <div className="info-item location">
                      <span className="icon">📍</span>
                      <span>{recruitment.region}</span>
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
                    <img
                      src={recruitment.profile.imageUrl || "/placeholder-profile.png"}
                      alt={recruitment.profile.name}
                    />
                    <div className="profile-details">
                      <div className="profile-name">{recruitment.profile.name}</div>
                    </div>
                  </div>
                  <button className="detail-button" onClick={(e) => handleProfileClick(recruitment.profile.id, e)}>
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
