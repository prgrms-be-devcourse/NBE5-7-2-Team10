"use client"

import { useState, useEffect } from "react"
import { getUserId, getRole } from "../../utils/storage"
import { profileAPI, tagAPI, regionAPI, userAPI } from "../../api"
import ProfileCreateModal from "./ProfileCreateModal"
import "./ProfileEdit.css"

const ProfileEdit = () => {
  const userId = parseInt(getUserId(), 10)
  const role = getRole()

  if (!userId || !role) return null

  const isIP = role === "ROLE_IP"

  const [profiles, setProfiles] = useState([])
  const [tags, setTags] = useState([])
  //const [regions, setRegions] = useState([])
  const [editingProfile, setEditingProfile] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    region: "",
    tags: [],
    imageFile: null,
    imagePreview: null,
    status: "true",
  })
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesResponse, tagsResponse, regionsResponse] = await Promise.all([
          profileAPI.getUserProfiles(userId),
          tagAPI.getAllTags(),
          //regionAPI.getAllRegions(),
        ])
        console.log("userId sent to getUserProfiles:", userId)

        setProfiles(profilesResponse.data || [])
        setTags(tagsResponse.data)
       // setRegions(regionsResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      region: "",
      tags: [],
      imageFile: null,
      imagePreview: null,
      status: "true",
    })
  }

  const handleEditClick = (profile) => {
    setEditingProfile(profile)

    setFormData({
      name: profile.name,
      description: profile.description,
      //region: profile.region.id,
      tags: profile.tags.map((tag) => tag.id),
      imageFile: null,
      imagePreview: profile.imageUrl,
      status: profile.status.toString(),
    })
  }

  const handleCreateClick = () => {
    setShowCreateModal(true)
  }

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
      //formDataToSend.append("regionId", formData.region)
      formData.tags.forEach((tagId) => {
        formDataToSend.append("tagIds", tagId)
      })
      formDataToSend.append("status", formData.status)

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile)
      }

      await profileAPI.updateProfile(editingProfile.id, formDataToSend)

      // Refresh profiles
      const profilesResponse = await profileAPI.getUserProfiles(userId)
      setProfiles(profilesResponse.data.profiles || [])

      setEditingProfile(null)
      resetForm()
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("프로필 저장에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingProfile(null)
    resetForm()
  }

  const handleProfileCreated = async (newProfile) => {
    // Refresh profiles after creation // 
    //const profilesResponse = await userAPI.getProfile(userId)
    const profilesResponse = await profileAPI.getUserProfiles(userId)
    setProfiles(profilesResponse.data || [])
  }

  // 프로필 삭제 핸들러 추가
  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm("정말로 이 프로필을 삭제하시겠습니까?")) {
      return
    }

    try {
      setLoading(true)
      await profileAPI.deleteProfile(profileId)

      // 프로필 목록 새로고침
      const profilesResponse = await profileAPI.getUserProfiles(userId)
      setProfiles(profilesResponse.data.profiles || [])

      alert("프로필이 삭제되었습니다.")
    } catch (error) {
      console.error("Error deleting profile:", error)
      alert("프로필 삭제에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <div className="profile-edit">
      <div className="section-header">
        <h2>프로필 편집</h2>
        <button className="btn btn-primary" onClick={handleCreateClick}>
          {isIP ? "새 IP 캐릭터 등록" : "매장 등록"}
        </button>
      </div>

      {editingProfile ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <h3>프로필 수정</h3>

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

          <div className="form-group">
            <label htmlFor="status">상태</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-control">
              <option value="true">활성</option>
              <option value="false">비활성</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              저장
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="profiles-list">
          {profiles.length === 0 ? (
            <div className="no-profiles">
              <p>등록된 프로필이 없습니다.</p>
              <button className="btn btn-primary" onClick={handleCreateClick}>
                {isIP ? "새 IP 캐릭터 등록" : "매장 등록"}
              </button>
            </div>
          ) : (
            <div className="profiles-grid">
              {profiles.map((profile) => (
                <div key={profile.id} className="profile-card">
                  <div className="profile-image">
                    <img 
                      src={`http://localhost:8080/api/files/images/${profile.imageUrl}`}
                      // src={profile.imageUrl || "/placeholder-profile.png"} 
                      alt={profile.name} 
                    />
                    <div className={`status-badge ${profile.status ? "active" : "inactive"}`}>
                      {profile.status ? "활성" : "비활성"}
                    </div>
                  </div>

                  <div className="profile-info">
                    <h3>{profile.name}</h3>
                  
                    <p className="profile-description">{profile.description}</p>

                    <div className="profile-meta">
                      <span className="created-date">생성일: {new Date(profile.createdAt).toLocaleDateString()}</span>
                      <span className="collabo-count">콜라보 횟수: {profile.collaboCount || 0}</span>
                    </div>

                    <div className="profile-tags">
                      {profile.tags.map((tag) => (
                        <span key={tag.id} className="tag">
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="profile-actions">
                      <button className="btn btn-primary edit-profile-btn" onClick={() => handleEditClick(profile)}>
                        수정
                      </button>
                      <button
                        className="btn btn-danger delete-profile-btn"
                        onClick={() => handleDeleteProfile(profile.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <ProfileCreateModal
          onClose={() => setShowCreateModal(false)}
          onProfileCreated={handleProfileCreated}
          tags={tags}
     
        />
      )}
    </div>
  )
}

export default ProfileEdit
