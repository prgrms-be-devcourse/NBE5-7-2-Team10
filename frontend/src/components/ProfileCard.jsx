"use client"
import "./ProfileCard.css"

const ProfileCard = ({ profile, onClick }) => {
  const isIP = profile.type === "IP"

  return (
    <div className={`profile-card ${isIP ? "ip-profile" : "store-profile"}`} onClick={onClick}>
      <div className="profile-type-badge">{isIP ? "IP 캐릭터" : "매장"}</div>
      <div className="profile-image">
        <img src={profile.imageUrl || "/placeholder-profile.png"} alt={profile.name} />
      </div>
      <div className="profile-info">
        <h3>{profile.name}</h3>
        <p className="profile-location">{profile.region}</p>
        <p className="profile-description">{profile.description}</p>
        <div className="profile-tags">
          {profile.tags &&
            profile.tags.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
