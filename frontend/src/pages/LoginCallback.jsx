"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // 예: ?accessToken=…&refreshToken=…&userId=…&nickname=…&role=…
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userId = searchParams.get('userId');
    const nickname = searchParams.get('nickname');
    const role = searchParams.get('role');

    // 토큰이 제대로 넘어왔으면 로그인 처리
    if (accessToken && refreshToken) {
      login({ accessToken, refreshToken, userId, nickname, role });
    } else {
      // 실패 시 로그인 화면으로 리다이렉트
      router.replace("/login?error=oauth_failed");
    }
  }, []);

  return <p>로그인 처리 중…</p>;
}
