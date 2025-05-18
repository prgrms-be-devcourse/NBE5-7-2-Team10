"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { applicationAPI, profileAPI } from "../api"
import "./RecruitmentDetailModal.css"

const RecruitmentDetailModal = ({ recruitment, onClose, isOwner = false, onDelete }) => {
  const { user } = useContext(AuthContext)
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

  useEffect(() => {
    if (showApplyForm) {
      fetchUserProfiles()
    }
  }, [showApplyForm])

  const fetchUserProfiles = async () => {
    try {
      setLoading(true)
      // 사용자의 프로필 가져오기
      const response = await profileAPI.getUserProfiles(user.id)

      // 모집글 타입과 반대되는 프로필만 필터링
      // IP 모집글이면 매장 프로필만, 매장 모집글이면 IP 프로필만 표시
      const isIPRecruitment = recruitment.profile.type === "IP"
      const filteredProfiles = response.data.filter((profile) =>
        isIPRecruitment ? profile.type === "STORE" : profile.type === "IP",
      )

      setUserProfiles(filteredProfiles)

      if (filteredProfiles.length > 0) {
        setFormData((prev) => ({
          ...prev,
          profileId: filteredProfiles[0].id,
        }))
        setSelectedProfile(filteredProfiles[0])
      }
    } catch (error) {
      console.error("Error fetching user profiles:", error)
      alert("프로필을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = () => {
    setShowApplyForm(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 프로필 ID가 변경되면 선택된 프로필 업데이트
    if (name === "profileId") {
      const profile = userProfiles.find((p) => p.id === value)
      setSelectedProfile(profile)
    }
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: Array.from(e.target.files),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.profileId) {
      alert("프로필을 선택해주세요.")
      return
    }

    try {
      setSubmitting(true)

      const formDataToSend = new FormData()
      formDataToSend.append("profileId", formData.profileId)
      formDataToSend.append("content", formData.content)

      formData.files.forEach((file) => {
        formDataToSend.append("files", file)
      })

      await applicationAPI.applyToRecruitment(recruitment.id, formDataToSend)

      alert("지원이 완료되었습니다.")
      onClose()
    } catch (error) {
      console.error("Error applying to recruitment:", error)
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
      <div
        className={`recruitment-detail-modal ${isIP ? "ip-modal" : "store-modal"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showApplyForm ? (
          <div className="apply-form-container">
            <div className="modal-header">
              <h2>지원하기</h2>
              <button className="modal-close" onClick={() => setShowApplyForm(false)}>
                &times;
              </button>
            </div>

            {loading ? (
              <div className="loading-container">
                <p>프로필 정보를 불러오는 중...</p>
              </div>
            ) : userProfiles.length === 0 ? (
              <div className="no-profiles-message">
                <p>지원 가능한 프로필이 없습니다.</p>
                <p>프로필을 먼저 등록해주세요.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onClose()
                    window.location.href = "/mypage/profile-edit"
                  }}
                >
                  프로필 등록하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="apply-form">
                <div className="form-group">
                  <label htmlFor="profileId">프로필 선택</label>
                  <select
                    id="profileId"
                    name="profileId"
                    value={formData.profileId}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    {userProfiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name} ({profile.type === "IP" ? "IP 캐릭터" : "매장"})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProfile && (
                  <div className="selected-profile-preview">
                    <div className="preview-header">선택된 프로필 정보</div>
                    <div className="preview-content">
                      <div className="preview-image">
                        <img src={selectedProfile.imageUrl || "/placeholder-profile.png"} alt={selectedProfile.name} />
                      </div>
                      <div className="preview-details">
                        <h4>{selectedProfile.name}</h4>
                        <p className="preview-type">{selectedProfile.type === "IP" ? "IP 캐릭터" : "매장"}</p>
                        <p className="preview-region">{selectedProfile.region?.name || "지역 정보 없음"}</p>
                        <div className="preview-tags">
                          {selectedProfile.tags &&
                            selectedProfile.tags.map((tag) => (
                              <span key={tag.id} className="preview-tag">
                                {tag.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="content">지원 내용</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-control"
                    rows="6"
                    placeholder="자기소개 및 지원 동기를 작성해주세요."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="files">첨부 파일 (선택사항)</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="files"
                      name="files"
                      onChange={handleFileChange}
                      multiple
                      className="form-control file-input"
                    />
                    <div className="file-upload-info">
                      <p>여러 파일을 선택할 수 있습니다.</p>
                      <p>지원 가능 파일: PDF, 이미지, 문서 파일 등</p>
                    </div>
                  </div>
                  {formData.files.length > 0 && (
                    <div className="selected-files">
                      <p>선택된 파일 ({formData.files.length}개):</p>
                      <ul>
                        {formData.files.map((file, index) => (
                          <li key={index}>
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "제출 중..." : "지원하기"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowApplyForm(false)}
                    disabled={submitting}
                  >
                    취소
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{recruitment.title}</h2>
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
            </div>

            <div className="recruitment-detail-content">
              <div className="profile-section">
                <div className="profile-image">
                  <img
                    src={recruitment.profile.imageUrl || "/placeholder-profile.png"}
                    alt={recruitment.profile.name}
                  />
                </div>

                <div className="profile-info">
                  <h3>{recruitment.profile.name}</h3>
                  <p className="profile-type">{isIP ? "IP 캐릭터" : "매장"}</p>
                  <p className="profile-location">{recruitment.profile.region}</p>

                  <div className="profile-tags">
                    {recruitment.profile.tags &&
                      recruitment.profile.tags.map((tag) => (
                        <span key={tag.id} className="tag">
                          {tag.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="recruitment-info">
                <div className="status-section">
                  <div className={`status-badge ${recruitment.status.toLowerCase()}`}>
                    {recruitment.status === "RECRUITING"
                      ? "모집중"
                      : recruitment.status === "COMPLETED"
                        ? "매칭완료"
                        : "마감됨"}
                  </div>

                  {isRecruiting && (
                    <div className="deadline-info">{daysLeft > 0 ? `마감까지 ${daysLeft}일 남음` : "오늘 마감"}</div>
                  )}
                </div>

                <div className="description-section">
                  <h3>모집 내용</h3>
                  <p>{recruitment.description}</p>
                </div>

                <div className="meta-section">
                  <div className="meta-item">
                    <span className="meta-label">작성일</span>
                    <span>{new Date(recruitment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">마감일</span>
                    <span>{new Date(recruitment.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {isOwner ? (
                <div className="owner-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      window.location.href = `/recruitment/edit/${recruitment.id}`
                    }}
                  >
                    수정
                  </button>
                  <button className="btn btn-delete" onClick={(e) => onDelete && onDelete(recruitment.id, e)}>
                    삭제
                  </button>
                </div>
              ) : (
                user &&
                isRecruiting && (
                  <button className="btn btn-primary apply-button" onClick={handleApplyClick}>
                    지원하기
                  </button>
                )
              )}
              <button className="btn btn-secondary" onClick={onClose}>
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RecruitmentDetailModal
