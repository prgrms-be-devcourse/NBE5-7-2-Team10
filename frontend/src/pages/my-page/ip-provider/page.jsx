import { Link } from 'react-router-dom';
import '../../globals.css';

export default function IPProviderMyPage() {
  // 샘플 데이터 - 실제로는 서버에서 가져올 데이터
  const user = {
    name: "김민수",
    email: "minsu@example.com",
    nickname: "creative_minsu",
    joinDate: "2023-01-15",
    role: "ip_provider",
  }

  const characterProfiles = [
    {
      id: 1,
      name: "행복한 고양이",
      type: "동물",
      image: "/placeholder.svg?height=60&width=60&text=고양이",
      createdAt: "2023-02-10",
      status: "active",
      collaborations: 3,
    },
    {
      id: 2,
      name: "우주 탐험대",
      type: "판타지",
      image: "/placeholder.svg?height=60&width=60&text=우주",
      createdAt: "2023-03-22",
      status: "active",
      collaborations: 1,
    },
    {
      id: 3,
      name: "귀여운 빵",
      type: "음식",
      image: "/placeholder.svg?height=60&width=60&text=빵",
      createdAt: "2023-05-05",
      status: "inactive",
      collaborations: 0,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "proposal_sent",
      title: "카페 시즌 메뉴 콜라보 제안",
      date: "2023-05-15",
      target: "스타일리시 카페",
    },
    {
      id: 2,
      type: "profile_created",
      title: "새 캐릭터 프로필 생성: 귀여운 빵",
      date: "2023-05-05",
    },
    {
      id: 3,
      type: "proposal_accepted",
      title: "레스토랑 브랜딩 콜라보 제안 수락됨",
      date: "2023-04-20",
      target: "모던 레스토랑",
    },
    {
      id: 4,
      type: "message_received",
      title: "새 메시지 수신",
      date: "2023-04-18",
      target: "달콤 디저트",
    },
  ]

  return (
    <div className="container py-10">
      <div className="grid md-grid-cols-sidebar gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="avatar avatar-large ip-provider-avatar">
              <img src="/placeholder.svg?height=128&width=128" alt="사용자 프로필" />
            </div>
            <div className="text-center">
              <h2 className="font-bold">{user.nickname}</h2>
              <p className="text-sm text-muted">{user.email}</p>
              <div className="badge badge-ip-provider mt-2">IP 제공자</div>
            </div>
            <Link href="/edit-profile" className="button button-ip-provider w-full">
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
              <div className="tab" data-tab="activity">
                활동 내역
              </div>
              <div className="tab" data-tab="account">
                계정 정보
              </div>
            </div>

            <div className="tab-content active" id="profiles">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">내 캐릭터 프로필</h3>
                <Link href="/create-character-profile" className="button button-ip-provider">
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
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                  새 캐릭터 추가
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characterProfiles.map((profile) => (
                  <div key={profile.id} className="card character-card">
                    <div className="card-content">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="avatar">
                          <img src={profile.image || "/placeholder.svg"} alt={profile.name} />
                        </div>
                        <div>
                          <h4 className="font-medium">{profile.name}</h4>
                          <p className="text-sm text-muted">{profile.type}</p>
                        </div>
                        {profile.status === "active" ? (
                          <span className="badge badge-ip-provider ml-auto">활성</span>
                        ) : (
                          <span className="badge badge-outline ml-auto">비활성</span>
                        )}
                      </div>

                      <div className="thumbnail-gallery mb-3">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="thumbnail-item">
                            <img
                              src={`/placeholder.svg?height=60&width=60&text=${profile.name}1`}
                              alt="썸네일 1"
                              className="rounded"
                            />
                          </div>
                          <div className="thumbnail-item">
                            <img
                              src={`/placeholder.svg?height=60&width=60&text=${profile.name}2`}
                              alt="썸네일 2"
                              className="rounded"
                            />
                          </div>
                          <div className="thumbnail-item">
                            <img
                              src={`/placeholder.svg?height=60&width=60&text=${profile.name}3`}
                              alt="썸네일 3"
                              className="rounded"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-sm mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-muted">생성일</span>
                          <span>{profile.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">콜라보 횟수</span>
                          <span>{profile.collaborations}회</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link
                          href={`/character-profile/${profile.id}`}
                          className="button button-outline button-sm flex-1"
                        >
                          상세보기
                        </Link>
                        <Link
                          href={`/edit-character-profile/${profile.id}`}
                          className="button button-outline button-sm flex-1"
                        >
                          편집
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card character-card-add">
                  <Link href="/create-character-profile" className="card-content flex-center">
                    <div className="text-center">
                      <div className="add-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                      <p className="mt-2">새 캐릭터 추가</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-4">추천 콜라보 공고</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="item-card">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="avatar">
                          <img src={`/placeholder.svg?height=40&width=40&text=카페${i}`} alt={`스타일리시 카페 ${i}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{`카페에서 캐릭터 IP 활용한 콜라보 메뉴 모집 ${i}`}</h4>
                          <p className="text-sm text-muted">{`스타일리시 카페 ${i}`}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        귀여운 캐릭터 IP를 활용한 시즌 한정 메뉴를 기획 중입니다. 독특하고 매력적인 캐릭터를 찾고
                        있습니다.
                      </p>
                      <div className="flex justify-between text-sm text-muted mb-3">
                        <span>마감일: 2023-06-30</span>
                        <span>예산: 협의 가능</span>
                      </div>
                      <Link href={`/post/${i}`} className="button button-ip-provider button-sm w-full">
                        자세히 보기
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tab-content" id="activity">
              <h3 className="font-semibold mb-4">최근 활동</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="item-card">
                    <div className="flex items-start gap-3">
                      <div className="activity-icon">
                        {activity.type === "proposal_sent" && (
                          <span className="icon-circle ip-provider-light">
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
                        )}
                        {activity.type === "profile_created" && (
                          <span className="icon-circle ip-provider-light">
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
                        )}
                        {activity.type === "proposal_accepted" && (
                          <span className="icon-circle ip-provider-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        )}
                        {activity.type === "message_received" && (
                          <span className="icon-circle ip-provider-light">
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
                        <span className="badge badge-ip-provider">IP 제공자</span>
                      </p>
                    </div>
                  </div>

                  <div className="separator"></div>

                  <div className="space-y-2">
                    <h4 className="font-medium">계정 보안</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>비밀번호</p>
                        <p className="text-sm text-muted">마지막 변경: 30일 전</p>
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
                        <span className="slider ip-provider-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <Link href="/edit-account" className="button button-ip-provider">
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
