"use client"

import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api"

// 브라우저 환경인지 확인
const isBrowser = typeof window !== "undefined"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 브라우저 환경에서만 토큰 처리
if (isBrowser) {
  // Add a request interceptor to include the auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Add a response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized, clear token and redirect to login
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
      return Promise.reject(error)
    },
  )
}

// Auth API
export const authAPI = {
  login: (code) => api.post("/auth/login", { code }),
  signup: (userData) => api.post("/auth/signup", userData),
}

// User API
export const userAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.patch(`/users/${userId}`, data),
  deleteAccount: (userId) => api.delete(`/users/${userId}`),
  getUserProfiles: (userId) => api.get(`/users/${userId}/profiles`),
}

// Profile API
export const profileAPI = {
  createProfile: (data) => api.post("/profiles", data),
  getProfile: (profileId) => api.get(`/profiles/${profileId}`),
  updateProfile: (profileId, data) => api.patch(`/profiles/${profileId}`, data),
  deleteProfile: (profileId) => api.delete(`/profiles/${profileId}`),
  getIPProfiles: (params) => api.get("/profiles/ip", { params }),
  getStoreProfiles: (params) => api.get("/profiles/store", { params }),
}

// Recruitment API
export const recruitmentAPI = {
  createRecruitment: (data) => api.post("/recruitments", data),
  getRecruitment: (id) => api.get(`/recruitments/${id}`),
  updateRecruitment: (id, data) => api.patch(`/recruitments/${id}`, data),
  deleteRecruitment: (id) => api.delete(`/recruitments/${id}`),
  getRecruitments: (params) => api.get("/recruitments", { params }),
  getUserRecruitments: (userId) => api.get(`/recruitments/users/${userId}`),
  getProfileRecruitments: (profileId) => api.get(`/recruitments/profiles/${profileId}`),
}

// Application API
export const applicationAPI = {
  applyToRecruitment: (recruitmentId, data) => api.post(`/applications/${recruitmentId}`, data),
  getSentApplications: (params) => api.get("/applications/sent", { params }),
  getReceivedApplications: (params) => api.get("/applications/received", { params }),
  acceptApplication: (applicationId) => api.patch(`/applications/accept/${applicationId}`),
}

// Admin API
export const adminAPI = {
  createTag: (data) => api.post("/admin/tags", data),
  deleteTag: (tagId) => api.delete(`/admin/tags/${tagId}`),
  getAllUsers: () => api.get("/admin/users"),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
}

// Tag API
export const tagAPI = {
  getAllTags: () => api.get("/tags"),
  getIPTags: () => api.get("/tags?type=IP"),
  getStoreTags: () => api.get("/tags?type=STORE"),
}

// Region API
export const regionAPI = {
  getAllRegions: () => api.get("/regions"),
  getProvinces: () => api.get("/regions/provinces"),
  getDistricts: (provinceId) => api.get(`/regions/districts?provinceId=${provinceId}`),
  getNeighborhoods: (districtId) => api.get(`/regions/neighborhoods?districtId=${districtId}`),
}
