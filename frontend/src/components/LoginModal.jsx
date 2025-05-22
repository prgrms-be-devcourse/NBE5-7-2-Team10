"use client"
import "./LoginModal.css"

const LoginModal = ({ onClose }) => {

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`
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
