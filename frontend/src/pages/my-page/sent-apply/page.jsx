import { Link } from "react-router-dom";
import "../../globals.css";

export default function SentProposals() {
  // 샘플 데이터
  const proposals = [
    {
      id: 1,
      postId: 101,
      postTitle: "카페 시즌 메뉴 콜라보 IP 모집",
      company: "스타카페",
      companyLogo: "/placeholder.svg?height=40&width=40&text=SC",
      date: "2023-05-10",
      status: "pending",
      message:
        "안녕하세요, 저희 캐릭터 IP를 활용한 시즌 메뉴 콜라보를 제안합니다. 귀여운 디자인으로 젊은 층에게 인기가 많으며...",
    },
    {
      id: 2,
      postId: 102,
      postTitle: "레스토랑 브랜딩을 위한 캐릭터 IP 모집",
      company: "맛있는식당",
      companyLogo: "/placeholder.svg?height=40&width=40&text=맛식",
      date: "2023-05-05",
      status: "accepted",
      message:
        "귀사의 레스토랑 브랜딩에 저희 캐릭터 IP를 활용해보세요. 다양한 연령층에게 사랑받는 캐릭터로 매장의 분위기를 밝게 만들 수 있습니다...",
    },
    {
      id: 3,
      postId: 103,
      postTitle: "디저트 가게 시즌 한정 패키지 디자인 IP 모집",
      company: "달콤디저트",
      companyLogo: "/placeholder.svg?height=40&width=40&text=달콤",
      date: "2023-04-28",
      status: "rejected",
      message:
        "시즌 한정 패키지 디자인에 저희 IP를 활용해보세요. 특별한 디자인으로 고객들에게 새로운 경험을 선사할 수 있습니다...",
    },
    {
      id: 4,
      postId: 104,
      postTitle: "카페 굿즈 제작을 위한 일러스트 IP 모집",
      company: "아트카페",
      companyLogo: "/placeholder.svg?height=40&width=40&text=AC",
      date: "2023-04-20",
      status: "pending",
      message:
        "카페 굿즈 제작에 저희 일러스트 IP를 활용해보세요. 독특한 스타일로 차별화된 굿즈를 만들 수 있습니다...",
    },
    {
      id: 5,
      postId: 105,
      postTitle: "음식점 메뉴판 디자인 IP 모집",
      company: "모던식당",
      companyLogo: "/placeholder.svg?height=40&width=40&text=모던",
      date: "2023-04-15",
      status: "accepted",
      message:
        "메뉴판 디자인에 저희 IP를 활용해보세요. 세련된 디자인으로 고객들에게 좋은 인상을 남길 수 있습니다...",
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold">보낸 제안 목록</h1>
      </div>

      <div className="mb-6 flex flex-col md-flex-row gap-4">
        <div className="flex-1">
          <input className="input" placeholder="제목, 회사명으로 검색" />
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="all">상태</option>
            <option value="pending">대기중</option>
            <option value="accepted">수락됨</option>
            <option value="rejected">거절됨</option>
          </select>
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="newest">정렬</option>
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
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
                내가 보낸 모든 제안 목록입니다.
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
                            src={proposal.companyLogo || "/placeholder.svg"}
                            alt={proposal.company}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md-flex-row md-items-center justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">
                              {proposal.postTitle}
                            </h3>
                            <p className="text-sm text-muted">
                              {proposal.company}
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
                            href={`#view-post-${proposal.postId}`}
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
                            공고 보기
                          </Link>
                          {proposal.status === "pending" && (
                            <button className="button button-outline button-sm button-danger">
                              제안 취소
                            </button>
                          )}
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
