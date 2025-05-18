"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { profileAPI } from "../../api"
import "./ProfileCreateModal.css"

const ProfileCreateModal = ({ onClose, onProfileCreated, tags, regions }) => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    region: "",
    tags: [],
    imageFile: null,
    imagePreview: null,
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
    const options = e.target.options
    const selectedTags = []

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value)
      }
    }

    setFormData((prev) => ({
      ...prev,
      tags: selectedTags,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("regionId", formData.region)
      formData.tags.forEach((tagId) => {
        formDataToSend.append("tagIds", tagId)
      })
      formDataToSend.append("status", formData.status)

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile)
      }

      const response = await profileAPI.createProfile(formDataToSend)

      alert("프로필이 성공적으로 생성되었습니다.")
      onProfileCreated(response.data)
      onClose()
    } catch (error) {
      console.error("Error creating profile:", error)
      alert("프로필 생성에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const isIP = user.role === "ROLE_IP"

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
          <div className="form-group">
            <label>프로필 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.imagePreview || "/placeholder-profile.png"} alt="프로필 이미지" />
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

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
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="region">지역</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">지역 선택</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그 (여러 개 선택 가능)</label>
            <select
              id="tags"
              name="tags"
              multiple
              value={formData.tags}
              onChange={handleTagChange}
              className="form-control"
              required
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <small>Ctrl 키를 누른 상태에서 여러 개 선택 가능합니다.</small>
          </div>

          <div className="form-info">
            <p>이메일: {user.email}</p>
            <p>프로필 유형: {isIP ? "IP 제공자" : "점주"}</p>
          </div>

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
