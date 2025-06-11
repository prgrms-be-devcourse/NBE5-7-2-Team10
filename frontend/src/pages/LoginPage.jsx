"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import LoginModal from "../components/LoginModal"
import "./LoginPage.css"

const LoginPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src="/logo.png" alt="Collabond" />
        </div>

        <h1>Collabond에 오신 것을 환영합니다</h1>
        <p>점주와 IP제공자를 위한 매칭 플랫폼</p>

        <div className="login-buttons">
          <button className="login-button" onClick={handleLoginClick}>
            로그인
          </button>
        </div>

        <div className="login-info">
          <p>로그인하면 Collabond의 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.</p>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}

export default LoginPage
