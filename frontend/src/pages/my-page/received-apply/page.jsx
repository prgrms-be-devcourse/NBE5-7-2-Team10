import { Link } from "react-router-dom";
import "../../globals.css";

export default function ReceivedProposals() {
  // 샘플 데이터
  const proposals = [
    {
      id: 1,
      postId: 1,
      postTitle: "카페에서 캐릭터 IP 활용한 콜라보 메뉴 모집",
      applicant: "김철수",
      applicantNickname: "cute_character",
      applicantImage: "/placeholder.svg?height=40&width=40&text=김철",
      date: "2023-05-12",
      status: "pending",
      message:
        "안녕하세요, 귀여운 캐릭터 IP를 제공합니다. 다양한 연령층에게 인기가 많으며, 카페 메뉴와 콜라보하면 좋은 시너지를 낼 수 있습니다.",
    },
    {
      id: 2,
      postId: 1,
      postTitle: "카페에서 캐릭터 IP 활용한 콜라보 메뉴 모집",
      applicant: "이영희",
      applicantNickname: "art_studio",
      applicantImage: "/placeholder.svg?height=40&width=40&text=이영",
      date: "2023-05-11",
      status: "accepted",
      message:
        "저희 스튜디오의 인기 캐릭터 IP를 제안합니다. 이미 여러 카페와 성공적인 콜라보 경험이 있으며, 고객들의 반응이 매우 좋았습니다.",
    },
    {
      id: 3,
      postId: 1,
      postTitle: "카페에서 캐릭터 IP 활용한 콜라보 메뉴 모집",
      applicant: "박민준",
      applicantNickname: "animal_friends",
      applicantImage: "/placeholder.svg?height=40&width=40&text=박민",
      date: "2023-05-10",
      status: "rejected",
      message:
        "동물 캐릭터 IP를 제공합니다. 귀여운 동물 캐릭터들로 카페 메뉴와 함께하면 인스타그램 등 SNS에서 화제가 될 수 있습니다.",
    },
    {
      id: 4,
      postId: 2,
      postTitle: "식당 인테리어에 활용할 아트워크 IP 모집",
      applicant: "정다은",
      applicantNickname: "modern_art",
      applicantImage: "/placeholder.svg?height=40&width=40&text=정다",
      date: "2023-04-25",
      status: "pending",
      message:
        "모던한 스타일의 아트워크 IP를 제공합니다. 식당 인테리어에 잘 어울리는 디자인으로 공간의 분위기를 한층 업그레이드할 수 있습니다.",
    },
    {
      id: 5,
      postId: 2,
      postTitle: "식당 인테리어에 활용할 아트워크 IP 모집",
      applicant: "최준호",
      applicantNickname: "nature_design",
      applicantImage: "/placeholder.svg?height=40&width=40&text=최준",
      date: "2023-04-22",
      status: "pending",
      message:
        "자연을 테마로 한 아트워크 IP를 제공합니다. 식당 분위기에 따라 다양한 스타일로 커스터마이징이 가능합니다.",
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold">받은 제안 목록</h1>
      </div>

      <div className="mb-6 flex flex-col md-flex-row gap-4">
        <div className="flex-1">
          <input className="input" placeholder="지원자, 내용으로 검색" />
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="all">공고 선택</option>
            <option value="1">캐릭터 IP 콜라보 모집</option>
            <option value="2">아트워크 IP 모집</option>
          </select>
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="all">상태</option>
            <option value="pending">대기중</option>
            <option value="accepted">수락됨</option>
            <option value="rejected">거절됨</option>
          </select>
        </div>
      </div>

      <div className="tabs mb-6">
        <div className="tabs-list">
          <div className="tab active" data-tab="all">
            전체 ({proposals.length})
          </div>
          <div className="tab" data-tab="pending">
            대기중 ({proposals.filter((p) => p.status === "pending").length})
          </div>
          <div className="tab" data-tab="accepted">
            수락됨 ({proposals.filter((p) => p.status === "accepted").length})
          </div>
          <div className="tab" data-tab="rejected">
            거절됨 ({proposals.filter((p) => p.status === "rejected").length})
          </div>
        </div>

        <div className="tab-content active" id="all">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">모든 제안</h3>
              <p className="card-description">
                내 공고에 받은 모든 제안 목록입니다.
              </p>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="item-card">
                    <div className="flex flex-col md-flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="avatar">
                          <img
                            src={proposal.applicantImage || "/placeholder.svg"}
                            alt={proposal.applicant}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md-flex-row md-items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {proposal.applicant}
                              </h3>
                              <span className="text-sm text-muted">
                                @{proposal.applicantNickname}
                              </span>
                            </div>
                            <p className="text-sm text-muted">
                              공고: {proposal.postTitle}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {proposal.status === "pending" && (
                              <span className="badge badge-warning">
                                대기중
                              </span>
                            )}
                            {proposal.status === "accepted" && (
                              <span className="badge badge-success">
                                수락됨
                              </span>
                            )}
                            {proposal.status === "rejected" && (
                              <span className="badge badge-error">거절됨</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted">
                          <div className="flex items-center gap-1">
                            <span className="icon icon-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </span>
                            <span>제안일: {proposal.date}</span>
                          </div>
                        </div>
                        <div className="mt-3 quote">
                          {proposal.message.length > 100
                            ? `${proposal.message.substring(0, 100)}...`
                            : proposal.message}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Link
                            href={`#view-proposal-${proposal.id}`}
                            className="button button-outline button-sm"
                          >
                            제안 상세보기
                          </Link>
                          <Link
                            href={`#view-profile-${proposal.applicantNickname}`}
                            className="button button-outline button-sm"
                          >
                            <span className="icon icon-sm mr-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </span>
                            프로필 보기
                          </Link>
                          {proposal.status === "pending" && (
                            <>
                              <button className="button button-success button-sm">
                                <span className="icon icon-sm mr-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                  </svg>
                                </span>
                                수락하기
                              </button>
                              <button className="button button-outline button-sm button-danger">
                                <span className="icon icon-sm mr-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                                  </svg>
                                </span>
                                거절하기
                              </button>
                            </>
                          )}
                          <button className="button button-outline button-sm">
                            <span className="icon icon-sm mr-1">
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
                            메시지 보내기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="tab-content" id="pending">
          {/* 대기중인 제안 내용 - 위와 유사한 구조 */}
        </div>

        <div className="tab-content" id="accepted">
          {/* 수락된 제안 내용 - 위와 유사한 구조 */}
        </div>

        <div className="tab-content" id="rejected">
          {/* 거절된 제안 내용 - 위와 유사한 구조 */}
        </div>
      </div>
    </div>
  );
}
