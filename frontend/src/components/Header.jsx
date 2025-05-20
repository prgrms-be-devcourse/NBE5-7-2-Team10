"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { getUserInfo, isSignedIn } from '../utils/storage'
import LoginModal from "./LoginModal"
import "./Header.css"

const Header = () => {
  const { logout } = useContext(AuthContext)
  const user = getUserInfo();
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLogout = () => {
    logout()
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleProfileClick = () => {
    navigate("/mypage")
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Collabond" />
          </Link>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                홈
              </Link>
            </li>
            <li>
              <Link to="/recruitment" onClick={() => setMobileMenuOpen(false)}>
                모집 게시판
              </Link>
            </li>
            {isSignedIn() ? (
              <>
                {user.role === "ROLE_ADMIN" && (
                  <li>
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      관리자
                    </Link>
                  </li>
                )}
                <li className="profile-menu-item">
                  <div className="profile-avatar" onClick={handleProfileClick}>
                    <img src={"https://www.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png"} alt={user.nickname} />
                  </div>
                  <div className="profile-dropdown">
                    <div className="dropdown-item" onClick={handleProfileClick}>
                      마이페이지
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      로그아웃
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                  로그인
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </header>
  )
}

export default Header
