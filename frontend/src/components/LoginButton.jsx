"use client"

import { useState } from "react"
import LoginModal from "./LoginModal"
import "./LoginButton.css"

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  return (
    <>
      <button className="login-button" onClick={handleLoginClick}>
        로그인
      </button>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  )
}

export default LoginButton
