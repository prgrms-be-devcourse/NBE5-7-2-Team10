"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { userAPI } from "../../api"
import "./UserInfo.css"

const UserInfo = () => {
  const { user, updateUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: "",
    phoneNumber: "",
    imageFile: null,
    imagePreview: null,
  })

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || "",
        phoneNumber: user.phoneNumber || "",
        imageFile: null,
        imagePreview: user.imageUrl || null,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const formDataToSend = new FormData()
      formDataToSend.append("nickname", formData.nickname)
      formDataToSend.append("phoneNumber", formData.phoneNumber)

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile)
      }

      const response = await userAPI.updateProfile(user.id, formDataToSend)

      // Update user context
      updateUser(response.data)

      setIsEditing(false)
    } catch (error) {
      console.error("Error updating user info:", error)
      alert("회원 정보 수정에 실패했습니다.")
    }
  }

  return (
    <div className="user-info">
      <div className="section-header">
        <h2>회원 정보</h2>
        {!isEditing && (
          <button className="btn btn-primary edit-btn" onClick={() => setIsEditing(true)}>
            수정
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>프로필 이미지</label>
            <div className="image-upload">
              <div className="image-preview">
                <img src={formData.imagePreview || "/placeholder-avatar.png"} alt="프로필 이미지" />
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <p className="form-static">{user?.email}</p>
            <small>이메일은 변경할 수 없습니다.</small>
          </div>

          <div className="form-group">
            <label>프로필 유형</label>
            <p className="form-static">{user?.role === "ROLE_IP" ? "IP 제공자" : "점주"}</p>
            <small>프로필 유형은 변경할 수 없습니다.</small>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              저장
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="user-info-display">
          <div className="info-group">
            <div className="user-image">
              <img src={user?.imageUrl || "/placeholder-avatar.png"} alt={user?.nickname} />
            </div>
          </div>

          <div className="info-group">
            <label>닉네임</label>
            <p>{user?.nickname}</p>
          </div>

          <div className="info-group">
            <label>이메일</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-group">
            <label>전화번호</label>
            <p>{user?.phoneNumber}</p>
          </div>

          <div className="info-group">
            <label>프로필 유형</label>
            <p>{user?.role === "ROLE_IP" ? "IP 제공자" : "점주"}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
