"use client"

import { useState, useEffect } from "react"
import "./TagSelector.css"

const TagSelector = ({ tags, selectedTags, onTagSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTags, setFilteredTags] = useState([])
  const [localSelectedTags, setLocalSelectedTags] = useState([])

  useEffect(() => {
    setLocalSelectedTags(selectedTags || [])
  }, [selectedTags])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTags(tags)
    } else {
      const filtered = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredTags(filtered)
    }
  }, [searchTerm, tags])

  const handleTagToggle = (tag) => {
    const isSelected = localSelectedTags.some((t) => t.id === tag.id)

    if (isSelected) {
      setLocalSelectedTags(localSelectedTags.filter((t) => t.id !== tag.id))
    } else {
      setLocalSelectedTags([...localSelectedTags, tag])
    }
  }

  const handleApply = () => {
    onTagSelect(localSelectedTags)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const handleClearAll = () => {
    setLocalSelectedTags([])
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tag-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>태그 선택</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="tag-selector-content">
          <div className="search-box">
            <input
              type="text"
              placeholder="태그 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="tags-container">
            {filteredTags.length === 0 ? (
              <p className="no-tags">검색 결과가 없습니다.</p>
            ) : (
              filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`tag-item ${localSelectedTags.some((t) => t.id === tag.id) ? "selected" : ""}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag.name}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClearAll}>
            전체 해제
          </button>
          <div>
            <button className="btn btn-secondary" onClick={handleCancel}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleApply}>
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagSelector
