"use client";

import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  setAccessToken,
  clearTokens,
} from "../utils/storage";

const BASE_URL = "http://localhost:8080";

// 브라우저 환경인지 확인
const isBrowser = typeof window !== "undefined";

export const api = axios.create({
  baseURL: BASE_URL,

});

// 브라우저 환경에서만 토큰 처리
if (isBrowser) {
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add a response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;
      // 응답 코드가 401이면 엑세스 토큰 재발급
      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        const refreshToken = getRefreshToken();
        // 리프레시 토큰이 없으면 로그아웃 처리
        if (!refreshToken) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }
        // 재발급 요청
        const { data } = await axios.post(`${BASE_URL}/api/tokens/refresh`, {
          refreshToken,
        });
        setAccessToken({
          accessToken: data.accessToken,
        });
        // 교체된 토큰으로 원 요청 재시도
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      }

      // 응답 코드가 410이면 리프레시 토큰 만료로 로그아웃 처리
      if (error.response?.status === 410) {
        clearTokens();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}

// User API
export const userAPI = {
  signup: (userData) => api.patch("/api/users/signup", userData),
  getUserInfo: (userId) => api.get(`/api/users/${userId}`),
  updateUserInfo: (data) => api.patch(`/api/users`, data),
  deleteAccount: () => api.delete(`/api/users`),
};

// Profile API
export const profileAPI = {
  getUserProfiles: (userId) => api.get(`/api/profiles/user/${userId}`),
  createProfile: (data) => api.post("/api/profiles", data),
  getProfile: (profileId) => api.get(`/api/profiles/${profileId}`),
  updateProfile: (profileId, data) =>
    api.patch(`/api/profiles/${profileId}`, data),
  deleteProfile: (profileId) => api.delete(`/api/profiles/${profileId}`),
  getIPProfiles: (params) => api.get("/api/profiles/ip", { params }),
  getStoreProfiles: (params) => api.get("/api/profiles/store", { params }),
};

// Recruitment API
export const recruitmentAPI = {
  createRecruitment: (data) => api.post("/api/recruitments", data),
  getRecruitment: (id) => api.get(`/api/recruitments/${id}`),
  updateRecruitment: (id, data) => api.patch(`/api/recruitments/${id}`, data),
  deleteRecruitment: (id) => api.delete(`/api/recruitments/${id}`),
  getRecruitments: (params) => api.get("/api/recruitments", { params }),
  getUserRecruitments: (userId) => api.get(`/api/recruitments/users/${userId}`),
  getProfileRecruitments: (profileId) =>
    api.get(`/api/recruitments/profiles/${profileId}`),
};

// Application API
export const applicationAPI = {
  applyToRecruitment: (recruitmentId, data) =>
    api.post(`/api/applications/${recruitmentId}`, data),
  getSentApplications: (params) =>
    api.get("/api/applications/sent", { params }),
  getReceivedApplications: (params) =>
    api.get("/api/applications/received", { params }),
  acceptApplication: (applicationId) =>
    api.patch(`/api/applications/accept/${applicationId}`),
};

// Admin API
export const adminAPI = {
  createTag: (data) => api.post("/admin/tags", data),
  deleteTag: (tagId) => api.delete(`/admin/tags/${tagId}`),
  getAllUsers: () => api.get("/admin/users"),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
};

// Tag API
export const tagAPI = {
  getAllTags: () => api.get("/api/tags"),
  getIPTags: () => api.get("/api/tags?type=IP"),
  getStoreTags: () => api.get("/api/tags?type=STORE"),
};

// Region API
export const regionAPI = {
  getAllRegions: () => api.get("/api/regions"),
  getProvinces: () => api.get("/api/regions/provinces"),
  getDistricts: (provinceId) =>
    api.get(`/api/regions/districts?provinceId=${provinceId}`),
  getNeighborhoods: (districtId) =>
    api.get(`/api/regions/neighborhoods?districtId=${districtId}`),
};
