"use client"
import "./ApplicationDetailModal.css"

const ApplicationDetailModal = ({ application, onClose, onAccept, isReceived }) => {
  const handleAccept = () => {
    onAccept(application.id)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return "대기중"
      case "ACCEPTED":
        return "수락됨"
      default:
        return status
    }
  }

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="application-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>지원서 상세</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="application-detail-content">
          <div className="detail-section">
            <h3>지원 정보</h3>
            <div className="detail-row">
              <span className="detail-label">상태</span>
              <span className={`status-badge.${getStatusClass(application.status)}`}>
                {getStatusLabel(application.status)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">신청일</span>
              <span>{new Date(application.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>프로필 정보</h3>
            <div className="profile-detail">
              <img src={`http://localhost:8080/api/files/images/${application.profile.imageUrl}` || "/placeholder-profile.png"} alt={application.profile.name} />
              <div>
                <h4>{application.profile.name}</h4>
                <p>{application.profile.type === "IP" ? "IP 캐릭터" : "매장"}</p>
                <p>{application.profile.region}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>모집글 정보</h3>
            <div className="recruitment-detail">
              <h4>{application.recruitPost.title}</h4>
              <p>{application.recruitPost.description}</p>
              <div className="detail-row">
                <span className="detail-label">마감일</span>
                <span>{new Date(application.recruitPost.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>지원 내용</h3>
            <div className="application-content-detail">
              <p>{application.content}</p>
            </div>
          </div>

          {application.attachments && application.attachments.length > 0 && (
            <div className="detail-section">
              <h3>첨부 파일</h3>
              <div className="attachments-list">
                {application.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attachment-link"
                  >
                    {attachment.originalName}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isReceived && application.status === "PENDING" && (
            <button className="btn btn-primary" onClick={handleAccept}>
              본딩
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetailModal
