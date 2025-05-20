"use client"

import { useState } from "react"
import { getUserId, getRole } from "../../utils/storage"
import { profileAPI } from "../../api"
import "./ProfileCreateModal.css"

const ProfileCreateModal = ({ onClose, onProfileCreated, tags, regions }) => {
  const userId = getUserId()
  const role = getRole()

  if (!userId || !role) return <p>회원 정보를 불러오는 중입니다...</p>

  const isIP = role === "ROLE_IP"

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    region: "",
    tags: [],
    profileImage: null,
    thumbnailImage: null,
    extraImages: [],
    imagePreview: null,
    thumbnailPreview: null,
    extraPreviews: [],
    status: "true",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value)
    setFormData((prev) => ({
      ...prev,
      tags: selected,
    }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleThumbnailImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnailImage: file,
        thumbnailPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      extraImages: files,
      extraPreviews: previews,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const data = new FormData()

      const profileRequest = {
        name: formData.name,
        description: formData.description,
        addressId: formData.region || null,
        tagIds: formData.tags,
        status: formData.status === "true",
        type: isIP ? "IP" : "STORE", // ✅ 반드시 포함해야 하는 값
      }

      data.append(
        "profileRequest",
        new Blob([JSON.stringify(profileRequest)], { type: "application/json" })
      )

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage)
      }

      if (formData.thumbnailImage) {
        data.append("thumbnailImage", formData.thumbnailImage)
      }

      formData.extraImages.forEach((file) => {
        data.append("extraImages", file)
      })

      const response = await profileAPI.createProfile(data)

      alert("프로필이 성공적으로 생성되었습니다.")
      onProfileCreated(response.data)
      onClose()
    } catch (err) {
      console.error("프로필 생성 실패:", err)
      alert("프로필 생성에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isIP ? "새 IP 캐릭터 등록" : "새 매장 등록"}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-create-form">
          {/* 프로필 이미지 */}
          <div className="form-group">
            <label>프로필 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.imagePreview || "/placeholder-profile.png"} alt="프로필 이미지" />
              </div>
              <input type="file" accept="image/*" onChange={handleProfileImageChange} required />
            </div>
          </div>

          {/* 썸네일 이미지 */}
          <div className="form-group">
            <label>썸네일 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.thumbnailPreview || "/placeholder-thumbnail.png"} alt="썸네일 이미지" />
              </div>
              <input type="file" accept="image/*" onChange={handleThumbnailImageChange} required />
            </div>
          </div>

          {/* 추가 이미지 */}
          <div className="form-group">
            <label>추가 이미지 (선택)</label>
            <div className="image-upload">
              {formData.extraPreviews.map((src, idx) => (
                <img key={idx} src={src} alt={`extra-${idx}`} style={{ width: "60px", marginRight: "5px" }} />
              ))}
              <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
            </div>
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* 소개 */}
          <div className="form-group">
            <label htmlFor="description">소개</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="4"
              required
            />
          </div>

          {/* 지역 */}
          <div className="form-group">
            <label htmlFor="region">지역</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">지역 선택</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* 태그 */}
          <div className="form-group">
            <label htmlFor="tags">태그 (여러 개 선택 가능)</label>
            <select
              id="tags"
              name="tags"
              multiple
              value={formData.tags}
              onChange={handleTagChange}
              className="form-control"
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <small>Ctrl 키 또는 Command 키를 누른 상태로 여러 개 선택할 수 있습니다.</small>
          </div>

          <div className="form-info">
            <p>프로필 유형: {isIP ? "IP 제공자" : "점주"}</p>
          </div>

          {/* 버튼 */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "생성 중..." : "프로필 생성"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCreateModal
