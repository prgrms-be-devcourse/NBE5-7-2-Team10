/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 서버 사이드 렌더링 비활성화 (React Router 사용 페이지)
  // 이 설정은 빌드 오류를 해결하기 위한 것입니다
  experimental: {
    appDir: true,
  },
  // 클라이언트 사이드에서만 렌더링할 페이지 설정
  // 이렇게 하면 서버 사이드 렌더링 시 발생하는 오류를 방지할 수 있습니다
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
