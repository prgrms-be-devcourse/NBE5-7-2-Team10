import { Link } from 'react-router-dom';

export default function StoreOwnerMyPage() {
  // 샘플 데이터 - 실제로는 서버에서 가져올 데이터
  const user = {
    name: "이지훈",
    email: "jihoon@example.com",
    nickname: "cafe_master",
    joinDate: "2023-02-20",
    role: "store_owner",
  }

  const storeProfile = {
    id: 1,
    name: "스타일리시 카페",
    type: "카페",
    image: "/placeholder.svg?height=60&width=60&text=카페",
    address: "서울시 강남구 테헤란로 123",
    createdAt: "2023-03-05",
    status: "active",
    collaborations: 2,
  }

  const recentActivities = [
    {
      id: 1,
      type: "post_created",
      title: "새 모집 공고 등록: 카페 시즌 메뉴 콜라보 IP 모집",
      date: "2023-05-20",
    },
    {
      id: 2,
      type: "proposal_received",
      title: "새 제안 수신: 귀여운 고양이 캐릭터 콜라보",
      date: "2023-05-18",
      target: "김민수",
    },
    {
      id: 3,
      type: "collaboration_started",
      title: "새 콜라보 시작: 우주 탐험대 캐릭터 메뉴 콜라보",
      date: "2023-05-10",
      target: "우주 탐험대",
    },
    {
      id: 4,
      type: "message_sent",
      title: "메시지 발송",
      date: "2023-05-05",
      target: "김민수",
    },
  ]

  const activeCollaborations = [
    {
      id: 1,
      title: "우주 탐험대 캐릭터 메뉴 콜라보",
      partner: "김민수",
      partnerProfile: "우주 탐험대",
      startDate: "2023-05-10",
      endDate: "2023-07-10",
      status: "진행중",
      image: "/placeholder.svg?height=40&width=40&text=우주",
    },
    {
      id: 2,
      title: "행복한 고양이 캐릭터 굿즈 콜라보",
      partner: "김민수",
      partnerProfile: "행복한 고양이",
      startDate: "2023-04-15",
      endDate: "2023-06-15",
      status: "진행중",
      image: "/placeholder.svg?height=40&width=40&text=고양이",
    },
  ]

  return (
    <div className="container py-10">
      <div className="grid md-grid-cols-sidebar gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="avatar avatar-large store-owner-avatar">
              <img src="/placeholder.svg?height=128&width=128" alt="사용자 프로필" />
            </div>
            <div className="text-center">
              <h2 className="font-bold">{user.nickname}</h2>
              <p className="text-sm text-muted">{user.email}</p>
              <div className="badge badge-store-owner mt-2">점주</div>
            </div>
            <Link href="/edit-profile" className="button button-store-owner w-full">
              회원 정보 수정
            </Link>
          </div>

          <div className="separator"></div>

          <nav className="space-y-2">
            <button className="button button-ghost w-full" style={{ justifyContent: "flex-start" }}>
              <span className="icon mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <span>프로필</span>
            </button>
            <Link
              href="/received-proposals"
              className="button button-ghost w-full"
              style={{ justifyContent: "flex-start" }}
            >
              <span className="icon mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </span>
              <span>받은 제안 목록</span>
            </Link>
            <Link
              href="/sent-proposals"
              className="button button-ghost w-full"
              style={{ justifyContent: "flex-start" }}
            >
              <span className="icon mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
              <span>보낸 제안 목록</span>
            </Link>
            <Link href="/my-posts" className="button button-ghost w-full" style={{ justifyContent: "flex-start" }}>
              <span className="icon mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <span>내가 쓴 글 목록</span>
            </Link>
            <Link
              href="/collaborations"
              className="button button-ghost w-full"
              style={{ justifyContent: "flex-start" }}
            >
              <span className="icon mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              <span>진행 중인 콜라보</span>
            </Link>
          </nav>

          <div className="separator"></div>

          <button className="button button-ghost w-full button-danger" style={{ justifyContent: "flex-start" }}>
            <span className="icon mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span>로그아웃</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="tabs">
            <div className="tabs-list">
              <div className="tab active" data-tab="profiles">
                프로필 목록
              </div>
              <div className="tab" data-tab="collaborations">
                진행 중인 콜라보
              </div>
              <div className="tab" data-tab="activity">
                활동 내역
              </div>
              <div className="tab" data-tab="account">
                계정 정보
              </div>
            </div>

            <div className="tab-content active" id="profiles">
              {storeProfile ? (
                <div className="card mb-6">
                  <div className="card-header">
                    <div className="flex justify-between items-center">
                      <h3 className="card-title">내 가게 프로필</h3>
                      <Link href={`/edit-store-profile/${storeProfile.id}`} className="button button-outline button-sm">
                        편집
                      </Link>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-large">
                          <img src={storeProfile.image || "/placeholder.svg"} alt={storeProfile.name} />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-xl">{storeProfile.name}</h3>
                          <p className="text-muted">{storeProfile.type}</p>
                        </div>

                        <div className="thumbnail-gallery mb-3">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="thumbnail-item">
                              <img
                                src={`/placeholder.svg?height=80&width=120&text=매장전경`}
                                alt="매장 전경"
                                className="rounded w-full h-20 object-cover"
                              />
                            </div>
                            <div className="thumbnail-item">
                              <img
                                src={`/placeholder.svg?height=80&width=120&text=메뉴`}
                                alt="대표 메뉴"
                                className="rounded w-full h-20 object-cover"
                              />
                            </div>
                            <div className="thumbnail-item">
                              <img
                                src={`/placeholder.svg?height=80&width=120&text=인테리어`}
                                alt="인테리어"
                                className="rounded w-full h-20 object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted">주소</p>
                            <p>{storeProfile.address}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted">생성일</p>
                            <p>{storeProfile.createdAt}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted">상태</p>
                            <p>
                              {storeProfile.status === "active" ? (
                                <span className="badge badge-store-owner">활성</span>
                              ) : (
                                <span className="badge badge-outline">비활성</span>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted">콜라보 횟수</p>
                            <p>{storeProfile.collaborations}회</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/store-profile/${storeProfile.id}`} className="button button-outline button-sm">
                            공개 프로필 보기
                          </Link>
                          <Link href="/create-post" className="button button-store-owner button-sm">
                            새 모집 공고 작성
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card mb-6">
                  <div className="card-content">
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-muted"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">아직 가게 프로필이 없습니다</h3>
                      <p className="text-muted mb-4">
                        콜라보레이션을 시작하려면 가게 프로필을 생성해주세요. 점주는 하나의 가게 프로필만 가질 수
                        있습니다.
                      </p>
                      <Link href="/create-store-profile" className="button button-store-owner">
                        가게 프로필 생성하기
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-semibold mb-4">추천 IP 프로필</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="item-card">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="avatar">
                          <img src={`/placeholder.svg?height=40&width=40&text=캐릭터${i}`} alt={`귀여운 캐릭터 ${i}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{`귀여운 캐릭터 ${i}`}</h4>
                          <p className="text-sm text-muted">{`김민수 ${i}`}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        다양한 연령층에게 인기 있는 귀여운 캐릭터입니다. 카페, 레스토랑 등 다양한 업종과의 콜라보레이션
                        경험이 있습니다.
                      </p>
                      <div className="flex justify-between text-sm text-muted mb-3">
                        <span>콜라보 경험: 5회</span>
                        <span>유형: 동물</span>
                      </div>
                      <Link href={`/character-profile/${i}`} className="button button-store-owner button-sm w-full">
                        자세히 보기
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tab-content" id="collaborations">
              <h3 className="font-semibold mb-4">진행 중인 콜라보레이션</h3>
              {activeCollaborations.length > 0 ? (
                <div className="space-y-4">
                  {activeCollaborations.map((collab) => (
                    <div key={collab.id} className="item-card">
                      <div className="flex items-start gap-3">
                        <div className="avatar">
                          <img src={collab.image || "/placeholder.svg"} alt={collab.partnerProfile} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{collab.title}</h4>
                              <p className="text-sm">
                                파트너: {collab.partner} ({collab.partnerProfile})
                              </p>
                            </div>
                            <span className="badge badge-store-owner">{collab.status}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted mt-2">
                            <span>
                              기간: {collab.startDate} ~ {collab.endDate}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Link
                              href={`/collaboration/${collab.id}`}
                              className="button button-outline button-sm flex-1"
                            >
                              상세보기
                            </Link>
                            <Link
                              href={`/collaboration/${collab.id}/messages`}
                              className="button button-store-owner button-sm flex-1"
                            >
                              메시지
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card">
                  <div className="card-content">
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-muted"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">진행 중인 콜라보레이션이 없습니다</h3>
                      <p className="text-muted mb-4">
                        새로운 콜라보레이션을 시작하려면 모집 공고를 작성하거나 IP 제공자에게 직접 제안해보세요.
                      </p>
                      <div className="flex justify-center gap-3">
                        <Link href="/create-post" className="button button-store-owner">
                          모집 공고 작성하기
                        </Link>
                        <Link href="/browse-characters" className="button button-outline">
                          IP 둘러보기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="tab-content" id="activity">
              <h3 className="font-semibold mb-4">최근 활동</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="item-card">
                    <div className="flex items-start gap-3">
                      <div className="activity-icon">
                        {activity.type === "post_created" && (
                          <span className="icon-circle store-owner-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </span>
                        )}
                        {activity.type === "proposal_received" && (
                          <span className="icon-circle store-owner-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </span>
                        )}
                        {activity.type === "collaboration_started" && (
                          <span className="icon-circle store-owner-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </span>
                        )}
                        {activity.type === "message_sent" && (
                          <span className="icon-circle store-owner-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-muted">{activity.date}</p>
                          {activity.target && <p className="text-sm">{activity.target}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tab-content" id="account">
              <div className="card mb-6">
                <div className="card-header">
                  <h3 className="card-title">계정 정보</h3>
                  <p className="card-description">회원 기본 정보입니다.</p>
                </div>
                <div className="card-content space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label">이름</label>
                      <p>{user.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="label">닉네임</label>
                      <p>{user.nickname}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="label">이메일</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="label">가입일</label>
                      <p>{user.joinDate}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="label">회원 역할</label>
                      <p>
                        <span className="badge badge-store-owner">점주</span>
                      </p>
                    </div>
                  </div>

                  <div className="separator"></div>

                  <div className="space-y-2">
                    <h4 className="font-medium">계정 보안</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>비밀번호</p>
                        <p className="text-sm text-muted">마지막 변경: 45일 전</p>
                      </div>
                      <button className="button button-outline button-sm">변경</button>
                    </div>
                  </div>

                  <div className="separator"></div>

                  <div className="space-y-2">
                    <h4 className="font-medium">알림 설정</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>이메일 알림</p>
                        <p className="text-sm text-muted">새로운 제안, 메시지 등의 알림을 이메일로 받습니다.</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider store-owner-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <Link href="/edit-account" className="button button-store-owner">
                    계정 정보 수정
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
