"use client"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import "./LoginModal.css"

const LoginModal = ({ onClose }) => {
  const { login } = useContext(AuthContext)

  const handleSocialLogin = async (provider) => {
    try {
      // 실제 구현에서는 OAuth 인증 과정을 거쳐야 합니다
      // 여기서는 간단히 모의 코드로 구현합니다
      const mockOAuthCode = `mock_${provider}_oauth_code_${Date.now()}`
      const result = await login(mockOAuthCode)

      if (result.isNewUser) {
        // 새 사용자인 경우 유형 선택 페이지로 이동
        window.location.href = "/user-type-selection"
      } else {
        // 기존 사용자인 경우 홈으로 이동
        window.location.href = "/"
      }

      onClose()
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error)
      alert(`${provider} 로그인에 실패했습니다.`)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>로그인</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="login-options">
          <button className="social-login-btn naver-login" onClick={() => handleSocialLogin("naver")}>
            <div className="social-icon">N</div>
            <span>네이버 로그인</span>
          </button>

          <button className="social-login-btn kakao-login" onClick={() => handleSocialLogin("kakao")}>
            <div className="social-icon">K</div>
            <span>카카오 로그인</span>
          </button>

          <button className="social-login-btn google-login" onClick={() => handleSocialLogin("google")}>
            <div className="social-icon">G</div>
            <span>구글 로그인</span>
          </button>
        </div>

        <div className="login-info">
          <p>로그인하면 Collabond의 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
