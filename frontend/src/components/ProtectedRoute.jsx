"use client"

import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getUserInfo } from '../utils/storage'

const ProtectedRoute = ({ children, adminOnly = false }) => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 서버 사이드 렌더링 시 또는 로딩 중일 때 로딩 표시
  if (!isMounted) {
    return <div className="loading">로딩 중...</div>
  }

  const userInfo = getUserInfo();

  if (!userInfo) {
    return <Navigate to="/login" />
  }

  if (adminOnly && userInfo.role !== "ROLE_ADMIN") {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
