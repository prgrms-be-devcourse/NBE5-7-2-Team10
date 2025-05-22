"use client"

import { useState, useEffect } from "react"
import { recruitmentAPI } from "../api"
import "./ProfileDetailModal.css"

const ProfileDetailModal = ({ profile, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const isIP = profile.type === "IP"
  const createdDate = new Date(profile.createdAt).toLocaleDateString()

  // 태그 목록
  const tagElements =
    profile.tags &&
    profile.tags.map((tag) => (
      <span key={tag.id} className="profile-tag">
        {tag.name}
      </span>
    ))

  // 추가 이미지 갤러리
  const extraImages =
    profile.extraImageUrls && profile.extraImageUrls.length > 0 ? (
      <div className="extra-images-gallery">
        <div className="gallery-scroll">
          {profile.extraImageUrls.map((url, index) => (
            <div
              key={index}
              className={`gallery-item ${activeImageIndex === index ? "active" : ""}`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img src={`http://localhost:8080/api/files/images/${url}`} alt={`${profile.name} 이미지 ${index + 1}`} />
              <div className="gallery-item-caption">{`${profile.name} ${index + 1}`}</div>
            </div>
          ))}
        </div>
        <button className="gallery-nav prev" onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}>
          &lt;
        </button>
        <button
          className="gallery-nav next"
          onClick={() => setActiveImageIndex(Math.min(profile.extraImageUrls.length - 1, activeImageIndex + 1))}
        >
          &gt;
        </button>
      </div>
    ) : null

  const address = 
    profile.address ? (
      <div className="detail-section">
        <h3>주소</h3>
        <p>{profile.address}</p>
      </div>
    ) : null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="profile-header">
          <div className="profile-thumbnail-container">
            <img
              src={`http://localhost:8080/api/files/images/${profile.thumbnailImageUrl}`}
              alt={profile.name}
              className="profile-thumbnail"
            />
          </div>

          <div className="profile-header-info">
            <div className="profile-title-box">
              <h1 className="profile-title">{profile.name}</h1>
              <span className="status-badge profile-status">{profile.status ? "활성" : "비활성"}</span>
            </div>
            <p className="profile-description">{profile.description}</p>
            <div className="profile-tags-container">{tagElements}</div>
            <div className="profile-actions">
              <div className="profile-creator">
                <div className="profile-image-small">
                  <img src={`http://localhost:8080/api/files/images/${profile.profileImageUrl}`} alt="프로필 이미지" />
                </div>
                <span className="profile-user-nickname">{profile.nickname}</span>
              </div>

              <div className="action-buttons">
                <button className="contact-button">연락 요청하기</button>
              </div>
            </div>
          </div>
        </div>

        {extraImages}

        <div className="profile-details">

          {address}

          <div className="detail-section">
            <h3>콜라보 횟수</h3>
            <p>{profile.collaboCount || 0}회</p>
          </div>

          <div className="detail-section">
            <h3>프로필 생성일</h3>
            <p>{createdDate}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfileDetailModal
