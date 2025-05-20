"use client"

import { useState, useEffect } from "react"
import { applicationAPI, profileAPI } from "../api"
import { getUserInfo } from "../utils/storage"
import { useNavigate } from "react-router-dom"
import "./RecruitmentDetailModal.css"

const RecruitmentDetailModal = ({ recruitment, onClose, isOwner = false, onDelete }) => {
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [userProfiles, setUserProfiles] = useState([])
  const [formData, setFormData] = useState({
    profileId: "",
    content: "",
    files: [],
  })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)

  const navigate = useNavigate()
  const user = getUserInfo()
  const userId = user?.userId

  useEffect(() => {
    if (showApplyForm && userId) {
      fetchUserProfiles()
    }
  }, [showApplyForm, userId])

  const fetchUserProfiles = async () => {
    try {
      setLoading(true)
      const response = await profileAPI.getUserProfiles(userId)

      const isIPRecruitment = recruitment.profile.type === "IP"
      const filtered = response.data.filter((p) => isIPRecruitment ? p.type === "STORE" : p.type === "IP")

      setUserProfiles(filtered)
      if (filtered.length > 0) {
        setFormData((prev) => ({ ...prev, profileId: filtered[0].id }))
        setSelectedProfile(filtered[0])
      }
    } catch (error) {
      console.error("프로필 불러오기 실패:", error)
      alert("프로필 정보를 불러올 수 없습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = () => setShowApplyForm(true)

  const handleEditClick = () => {
    navigate(`/recruitment/edit/${recruitment.id}`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "profileId") {
      const profile = userProfiles.find((p) => p.id == value)
      setSelectedProfile(profile)
    }
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.profileId) return alert("프로필을 선택해주세요.")

    try {
      setSubmitting(true)
      const applyRequest = new Blob(
        [JSON.stringify({ profileId: formData.profileId, content: formData.content })],
        { type: "application/json" }
      )

      const formDataToSend = new FormData()
      formDataToSend.append("applyRequest", applyRequest)
      formData.files.forEach((file) => formDataToSend.append("attachment", file))

      await applicationAPI.applyToRecruitment(recruitment.id, formDataToSend)
      alert("지원이 완료되었습니다.")
      onClose()
    } catch (error) {
      console.error("지원 실패:", error)
      alert("지원에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const isIP = recruitment.profile.type === "IP"
  const isRecruiting = recruitment.status === "RECRUITING"
  const daysLeft = Math.ceil((new Date(recruitment.deadline) - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`recruitment-detail-modal ${isIP ? "ip-modal" : "store-modal"}`} onClick={(e) => e.stopPropagation()}>
        {showApplyForm ? (
          <div className="apply-form-container">
            <div className="modal-header">
              <h2>지원하기</h2>
              <button className="modal-close" onClick={() => setShowApplyForm(false)}>&times;</button>
            </div>
            {loading ? (
              <p>프로필 불러오는 중...</p>
            ) : userProfiles.length === 0 ? (
              <div className="no-profiles-message">
                <p>지원 가능한 프로필이 없습니다. 마이페이지에서 등록해주세요.</p>
                <button className="btn" onClick={() => { onClose(); window.location.href = "/mypage/profile-edit" }}>프로필 등록하기</button>
              </div>
            ) : (
              <form className="apply-form" onSubmit={handleSubmit}>
                <label>프로필 선택</label>
                <select name="profileId" value={formData.profileId} onChange={handleChange} required>
                  {userProfiles.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                  ))}
                </select>

                {selectedProfile && (
                  <div className="selected-profile-preview">
                    <div className="preview-header">선택한 프로필</div>
                    <div className="preview-content">
                      <div className="preview-image">
                        <img src={selectedProfile.imageUrl || "/placeholder-profile.png"} alt="프로필 이미지" />
                      </div>
                      <div className="preview-details">
                        <h4>{selectedProfile.name}</h4>
                        <p className="preview-type">{selectedProfile.type === "IP" ? "IP 캐릭터" : "매장"}</p>
                        <p className="preview-region">{selectedProfile.region?.sido} {selectedProfile.region?.sigungu}</p>
                        <div className="preview-tags">
                          {selectedProfile.tags?.map((tag) => (
                            <span key={tag.id} className="preview-tag">{tag.name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <label>지원 내용</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="apply-textarea"
                  placeholder="지원 동기, 협업 의지 등 자세히 작성해 주세요."
                  rows="8"
                  required
                />

                <div className="file-upload-container">
                  <input type="file" multiple onChange={handleFileChange} />
                  <div className="file-upload-info">
                    <p>첨부할 파일을 선택하세요 (선택사항)</p>
                  </div>
                  {formData.files.length > 0 && (
                    <div className="selected-files">
                      <p>선택된 파일 목록:</p>
                      <ul>
                        {formData.files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary apply-button">
                  {submitting ? "제출 중..." : "지원하기"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{recruitment.title}</h2>
              <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <div className="profile-info">
              <img src={recruitment.profile.imageUrl || "/placeholder-profile.png"} alt="Profile" />
              <h3>{recruitment.profile.name}</h3>
              <p>{recruitment.profile.type === "IP" ? "IP 캐릭터" : "매장"}</p>
              <p>{recruitment.profile.address?.sido} {recruitment.profile.address?.sigungu}</p>
              <div>
                {recruitment.profile.tags?.map((tag) => (
                  <span key={tag.id} className="tag">{tag.name}</span>
                ))}
              </div>
            </div>
            <div className="recruitment-info">
              <p>{recruitment.description}</p>
              <p>등록일: {new Date(recruitment.createdAt).toLocaleDateString()}</p>
              <p>마감일: {new Date(recruitment.deadline).toLocaleDateString()}</p>
              <p>{isRecruiting && (daysLeft > 0 ? `마감까지 ${daysLeft}일 남음` : "오늘 마감")}</p>
            </div>
            <div className="modal-footer">
              {isOwner ? (
                <>
                  <button className="btn" onClick={handleEditClick}>수정</button>
                  <button className="btn btn-delete" onClick={(e) => onDelete && onDelete(recruitment.id, e)}>삭제</button>
                </>
              ) : (
                userId && isRecruiting && (
                  <button className="btn btn-primary" onClick={handleApplyClick}>지원하기</button>
                )
              )}
              <button className="btn" onClick={onClose}>닫기</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RecruitmentDetailModal
