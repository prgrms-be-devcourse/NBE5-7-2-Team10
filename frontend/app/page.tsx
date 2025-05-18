"use client"

import dynamic from "next/dynamic"

// 클라이언트 사이드에서만 App 컴포넌트 로드
const App = dynamic(() => import("../src/App"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
})

export default function Page() {
  return <App />
}
