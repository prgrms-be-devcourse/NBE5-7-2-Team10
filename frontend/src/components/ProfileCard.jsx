"use client"
import "./ProfileCard.css"

const ProfileCard = ({ profile, onClick }) => {
  const isIP = profile.type === "IP"

  return (
    <div className={`profile-card ${isIP ? "ip-profile" : "store-profile"}`} onClick={onClick}>
      <div className="profile-image-container">
        <img
          src={`http://localhost:8080/api/files/images/${profile.thumbnailImageUrl}`}
          alt={profile.name}
          className="profile-thumbnail"
        />
      </div>
      <div className="profile-info">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-address">{profile.address}</p>
        <div className="profile-tags">
          {profile.tags &&
            profile.tags.map(
              (tag, index) =>
                index < 5 && (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ),
            )}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
