"use client"

import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 서버 사이드 렌더링 시 또는 로딩 중일 때 로딩 표시
  if (!isMounted || loading) {
    return <div className="loading">로딩 중...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (adminOnly && user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
