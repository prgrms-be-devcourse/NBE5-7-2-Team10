"use client"

import { createContext, useState, useEffect } from "react"
import { api } from "../api"

// 초기 상태 정의
const initialState = {
  user: null,
  loading: true,
  login: () => Promise.resolve({ isNewUser: false }),
  logout: () => {},
  updateUser: () => {},
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBrowser, setIsBrowser] = useState(false)

  // 클라이언트 사이드에서만 실행되도록 설정
  useEffect(() => {
    // 즉시 브라우저 환경으로 설정
    setIsBrowser(true)

    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          // Validate token and get user info
          const response = await api.get("/users/me")
          setUser(response.data)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (code) => {
    try {
      const response = await api.post("/auth/login", { code })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setUser(user)

      return { isNewUser: user.isNewUser }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    if (isBrowser) {
      localStorage.removeItem("token")
    }
    setUser(null)
  }

  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }))
  }

  // 서버 사이드 렌더링 시 초기 상태 반환
  if (!isBrowser) {
    return <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>{children}</AuthContext.Provider>
}
