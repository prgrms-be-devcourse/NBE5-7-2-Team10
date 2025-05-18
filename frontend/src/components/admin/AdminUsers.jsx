"use client"

import { useState, useEffect } from "react"
import { adminAPI } from "../../api"
import "./AdminUsers.css"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllUsers()
      setUsers(response.data)
      setFilteredUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("정말로 이 회원을 강제 탈퇴시키겠습니까?")) {
      return
    }

    try {
      await adminAPI.deleteUser(userId)

      // Refresh users list
      fetchUsers()

      alert("회원이 강제 탈퇴되었습니다.")
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("회원 강제 탈퇴에 실패했습니다.")
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "관리자"
      case "ROLE_STORE":
        return "점주"
      case "ROLE_IP":
        return "IP 제공자"
      default:
        return role
    }
  }

  return (
    <div className="admin-users">
      <div className="section-header">
        <h2>전체 회원 조회</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="no-users">
          <p>회원이 없습니다.</p>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>프로필</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>전화번호</th>
                <th>유형</th>
                <th>가입일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="user-image">
                    <img src={user.imageUrl || "/placeholder-avatar.png"} alt={user.nickname} />
                  </td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td>{user.phoneNumber || "-"}</td>
                  <td>{getRoleLabel(user.role)}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    {user.role !== "ROLE_ADMIN" && (
                      <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>
                        강제 탈퇴
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
