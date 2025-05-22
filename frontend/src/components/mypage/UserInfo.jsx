"use client"

import { useState, useContext, useEffect } from "react"
import { userAPI } from "../../api"
import { setNickname } from "../../utils/storage"
import "./UserInfo.css"

const UserInfo = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: "",
  })

  useEffect( () => {
    async function fetchData() {
      const response = await userAPI.getMyUserInfo()
      
      if(response) {
        setUser(response.data);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await userAPI.updateUserInfo(formData)

      setUser(response.data)
      setNickname(response.data.nickname)
      window.location.href = "/mypage"

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
            <label>이메일</label>
            <p className="form-static">{user?.email}</p>
            <small>이메일은 변경할 수 없습니다.</small>
          </div>

          <div className="form-group">
            <label>회원 유형</label>
            <p className="form-static">{user?.role === "ROLE_IP" ? "IP 제공자" : "점주"}</p>
            <small>회원 유형은 변경할 수 없습니다.</small>
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
            <label>닉네임</label>
            <p>{user?.nickname}</p>
          </div>

          <div className="info-group">
            <label>이메일</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-group">
            <label>회원 유형</label>
            <p>{user?.role === "ROLE_IP" ? "IP 제공자" : "점주"}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
