"use client"

import { useState, useEffect } from "react"
import { applicationAPI } from "../../api"
import ApplicationDetailModal from "../ApplicationDetailModal"
import "./Applications.css"

const SentApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    fetchApplications()
  }, [filter, sort])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const sortMapping = {
        newest: "createdAt,desc",
        oldest: "createdAt,asc",
      }
      const params = {
        status: filter !== "all" ? filter : undefined,
        sort: sortMapping[sort]
      }

      const response = await applicationAPI.getSentApplications(params)
      const data = response.data?.content || []
      setApplications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewApplication = (application) => {
    setSelectedApplication(application)
    setShowModal(true)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return "대기중"
      case "ACCEPTED":
        return "수락됨"
      case "REJECTED":
        return "본딩실패"
      default:
        return status
    }
  }

  return (
    <div className="applications">
      <div className="section-header">
        <h2>보낸 제안 목록</h2>
        <div className="filter-controls">
          <select value={filter} onChange={handleFilterChange} className="form-control">
            <option value="all">전체</option>
            <option value="PENDING">대기중</option>
            <option value="ACCEPTED">수락됨</option>
            <option value="REJECTED">본딩실패</option>
          </select>

          <select value={sort} onChange={handleSortChange} className="form-control">
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : applications.length === 0 ? (
        <div className="no-applications">
          <p>보낸 제안이 없습니다.</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <div className="profile-info">
                  <img
                    src={`http://localhost:8080/api/files/images/${application.profile.imageUrl}` || "/placeholder-profile.png"}
                    alt={application.profile.name}
                  />
                  <div>
                    <h3>{application.profile.name}</h3>
                    <p>{application.profile.type === "IP" ? "IP 캐릭터" : "매장"}</p>
                  </div>
                </div>
                <div className={`status-badge ${application.status.toLowerCase()}`}>
                  {getStatusLabel(application.status)}
                </div>
              </div>

              <div className="application-content">
                <p className="application-message">
                  {application.content.length > 100
                    ? `${application.content.substring(0, 100)}...`
                    : application.content}
                </p>

                <div className="application-meta">
                  <span className="application-date">
                    신청일: {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                  <span className="recruitment-title">모집글: {application.recruitPost.title}</span>
                </div>
              </div>

              <div className="application-actions">
                <button className="btn btn-secondary" onClick={() => handleViewApplication(application)}>
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setShowModal(false)}
          isReceived={false}
        />
      )}
    </div>
  )
}

export default SentApplications
