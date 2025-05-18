"use client"

import { useState, useEffect } from "react"
import { adminAPI, tagAPI } from "../../api"
import "./AdminTags.css"

const AdminTags = () => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    type: "IP", // Default to IP
  })

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      setLoading(true)
      const response = await tagAPI.getAllTags()
      setTags(response.data)
    } catch (error) {
      console.error("Error fetching tags:", error)
    } finally {
      setLoading(false)
    }
  }

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
      await adminAPI.createTag(formData)

      // Reset form
      setFormData({
        name: "",
        type: "IP",
      })

      // Refresh tags
      fetchTags()

      alert("태그가 생성되었습니다.")
    } catch (error) {
      console.error("Error creating tag:", error)
      alert("태그 생성에 실패했습니다.")
    }
  }

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm("정말로 이 태그를 삭제하시겠습니까?")) {
      return
    }

    try {
      await adminAPI.deleteTag(tagId)

      // Refresh tags
      fetchTags()

      alert("태그가 삭제되었습니다.")
    } catch (error) {
      console.error("Error deleting tag:", error)
      alert("태그 삭제에 실패했습니다.")
    }
  }

  return (
    <div className="admin-tags">
      <div className="section-header">
        <h2>태그 관리</h2>
      </div>

      <div className="tags-container">
        <div className="tag-form-container">
          <h3>새 태그 생성</h3>
          <form onSubmit={handleSubmit} className="tag-form">
            <div className="form-group">
              <label htmlFor="name">태그 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="태그 이름을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">태그 타입</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="IP">IP 캐릭터</option>
                <option value="STORE">매장</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              태그 생성
            </button>
          </form>
        </div>

        <div className="tags-list-container">
          <h3>태그 목록</h3>

          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : tags.length === 0 ? (
            <div className="no-tags">
              <p>등록된 태그가 없습니다.</p>
            </div>
          ) : (
            <div className="tags-list">
              <div className="tags-header">
                <span className="tag-name-header">태그 이름</span>
                <span className="tag-type-header">타입</span>
                <span className="tag-action-header">관리</span>
              </div>

              {tags.map((tag) => (
                <div key={tag.id} className="tag-item">
                  <span className="tag-name">{tag.name}</span>
                  <span className={`tag-type ${tag.type.toLowerCase()}`}>
                    {tag.type === "IP" ? "IP 캐릭터" : "매장"}
                  </span>
                  <button className="btn-delete" onClick={() => handleDeleteTag(tag.id)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTags
