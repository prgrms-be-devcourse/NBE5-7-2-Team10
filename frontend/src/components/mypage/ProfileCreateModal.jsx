"use client"

import { useState } from "react"
import { getUserId, getRole } from "../../utils/storage"
import { profileAPI } from "../../api"
import SingleRegionSelector from "../SingleRegionSelector"
import "./ProfileCreateModal.css"

const ProfileCreateModal = ({ onClose, onProfileCreated, tags = [], regions = [], isIP }) => {
  const userId = getUserId()
  const role = getRole()
  if (!userId || !role) return <p>회원 정보를 불러오는 중입니다...</p>

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [],
    profileImage: null,
    thumbnailImage: null,
    extraImages: [],
    imagePreview: null,
    thumbnailPreview: null,
    extraPreviews: [],
    status: "true",
    // STORE용 주소
    addressCode: "",
    address: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
    setFormData(prev => ({ ...prev, tags: selected }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setFormData(prev => ({
      ...prev,
      profileImage: file,
      imagePreview: URL.createObjectURL(file)
    }))
  }

  const handleThumbnailImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setFormData(prev => ({
      ...prev,
      thumbnailImage: file,
      thumbnailPreview: URL.createObjectURL(file)
    }))
  }

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map(f => URL.createObjectURL(f))
    setFormData(prev => ({ ...prev, extraImages: files, extraPreviews: previews }))
  }

  // STORE 주소 토글바 선택 핸들러
  const handleRegionSelect = (selection) => {
    setFormData(prev => ({ ...prev, addressCode: selection.code, address: selection.fullAddress }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const data = new FormData()
      const profileRequest = {
        name: formData.name,
        description: formData.description,
        tagIds: formData.tags,
        status: formData.status === "true",
        type: isIP ? "IP" : "STORE",
        addressCode: isIP ? null : formData.addressCode,
        address: isIP ? null : formData.address,
      }

      data.append(
        "profileRequest",
        new Blob([JSON.stringify(profileRequest)], { type: "application/json" })
      )
      if (formData.profileImage) data.append("profileImage", formData.profileImage)
      if (formData.thumbnailImage) data.append("thumbnailImage", formData.thumbnailImage)
      formData.extraImages.forEach(file => data.append("extraImages", file))

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

  const safeTags = Array.isArray(tags) ? tags : []
  const safeRegions = Array.isArray(regions) ? regions : []

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-create-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isIP ? "새 IP 캐릭터 등록" : "새 매장 등록"}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="profile-create-form">
          {/* PROFILE 이미지 */}
          <div className="form-group">
            <label>프로필 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.imagePreview || "/placeholder-profile.png"} alt="PROFILE" />
              </div>
              <input type="file" accept="image/*" onChange={handleProfileImageChange} required />
            </div>
          </div>

          {/* THUMBNAIL 이미지 */}
          <div className="form-group">
            <label>썸네일 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.thumbnailPreview || "/placeholder-thumbnail.png"} alt="THUMBNAIL" />
              </div>
              <input type="file" accept="image/*" onChange={handleThumbnailImageChange} required />
            </div>
          </div>

          {/* EXTRA 이미지 */}
          <div className="form-group">
            <label>추가 이미지 (선택)</label>
            <div className="image-upload multiple">
              <div className="image-previews">
                {formData.extraPreviews.map((src, idx) => (
                  <img key={idx} src={src} alt={`extra-${idx}`} width={60} />
                ))}
              </div>
              <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
            </div>
          </div>

          {/* 이름 & 소개 */}
          <div className="form-group">
            <label>이름</label>
            <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>소개</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows={4} required />
          </div>

          {/* 주소 선택: STORE만 */}
          {!isIP && (
            <div className="form-group">
              <label>주소 선택</label>
              <SingleRegionSelector
                regions={safeRegions}
                selectedCode={formData.addressCode}
                onSelect={handleRegionSelect}
              />
              {formData.address && <p className="selected-address">선택된 주소: {formData.address}</p>}
            </div>
          )}

          {/* 태그 선택 */}
          <div className="form-group">
            <label>태그 (여러 개 선택 가능)</label>
            <select multiple value={formData.tags} onChange={handleTagChange} className="form-control" required>
              {safeTags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <small>Ctrl 또는 Command 키를 누르고 선택하세요.</small>
          </div>

          {/* 상태 */}
          <div className="form-group">
            <label>상태</label>
            <select name="status" value={formData.status} onChange={handleChange} className="form-control">
              <option value="true">활성</option>
              <option value="false">비활성</option>
            </select>
          </div>

          {/* Action Buttons */}
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
