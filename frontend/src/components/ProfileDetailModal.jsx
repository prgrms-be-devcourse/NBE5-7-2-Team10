"use client"

import { useState, useEffect } from "react"
import { recruitmentAPI } from "../api"
import "./ProfileDetailModal.css"

const ProfileDetailModal = ({ profile, onClose }) => {
  const [recruitments, setRecruitments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await recruitmentAPI.getProfileRecruitments(profile.id)
        setRecruitments(response.data)
      } catch (error) {
        console.error("Error fetching recruitments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecruitments()
  }, [profile.id])

  const isIP = profile.type === "IP"

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{profile.name}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="profile-detail-content">
          <div className="profile-detail-image">
            <img src={profile.imageUrl || "/placeholder-profile.png"} alt={profile.name} />
          </div>

          <div className="profile-detail-info">
            <div className="profile-type-badge">{isIP ? "IP 캐릭터" : "매장"}</div>

            <div className="info-group">
              <h3>소개</h3>
              <p>{profile.description}</p>
            </div>

            <div className="info-group">
              <h3>지역</h3>
              <p>{profile.region}</p>
            </div>

            <div className="info-group">
              <h3>태그</h3>
              <div className="profile-tags">
                {profile.tags &&
                  profile.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
              </div>
            </div>

            <div className="info-group">
              <h3>콜라보 횟수</h3>
              <p>{profile.collaboCount || 0}회</p>
            </div>
          </div>
        </div>

        {recruitments.length > 0 && (
          <div className="profile-recruitments">
            <h3>모집 게시글</h3>
            <div className="recruitments-list">
              {recruitments.map((recruitment) => (
                <div key={recruitment.id} className="recruitment-item">
                  <h4>{recruitment.title}</h4>
                  <p>{recruitment.description}</p>
                  <div className="recruitment-footer">
                    <span className="deadline">마감일: {new Date(recruitment.deadline).toLocaleDateString()}</span>
                    <a href={`/recruitment/${recruitment.id}`} className="view-link">
                      자세히 보기
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileDetailModal
