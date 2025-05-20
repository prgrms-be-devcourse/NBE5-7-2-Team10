"use client"
import { useState } from "react"
import {
  getUserId,
  getRole,
  getNickname,
  setNickname
} from "../../utils/storage"
import { userAPI } from "../../api"
import "./UserInfo.css"

const UserInfo = () => {
  const userId = getUserId()
  const role = getRole()
  const nickname = getNickname()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: nickname || "",
  })

  // 사용자 정보가 없으면 로딩 상태 출력
  if (!userId || !role) {
    return <p>회원 정보를 불러오는 중입니다...</p>
  }

  const isIP = role === "ROLE_IP"

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
      setNickname(response.data.nickname) // localStorage 갱신
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
            <p className="form-static">-</p> {/* 이메일은 localStorage에 없으므로 비워둠 */}
            <small>이메일은 변경할 수 없습니다.</small>
          </div>

          <div className="form-group">
            <label>회원 유형</label>
            <p className="form-static">{isIP ? "IP 제공자" : "점주"}</p>
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
            <p>{nickname}</p>
          </div>

          <div className="info-group">
            <label>이메일</label>
            <p className="form-static">-</p> {/* 이메일 없음 표시 */}
          </div>

          <div className="info-group">
            <label>회원 유형</label>
            <p>{isIP ? "IP 제공자" : "점주"}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
