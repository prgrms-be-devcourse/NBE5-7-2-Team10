import { Link } from "react-router-dom";
import "../../globals.css";

export default function MyPosts() {
  // 샘플 데이터
  const posts = [
    {
      id: 1,
      title: "카페에서 캐릭터 IP 활용한 콜라보 메뉴 모집",
      date: "2023-05-15",
      status: "active",
      views: 245,
      proposals: 12,
      deadline: "2023-06-15",
    },
    {
      id: 2,
      title: "식당 인테리어에 활용할 아트워크 IP 모집",
      date: "2023-04-20",
      status: "active",
      views: 189,
      proposals: 8,
      deadline: "2023-05-20",
    },
    {
      id: 3,
      title: "팝업 스토어 콜라보 파트너 모집 (음식점)",
      date: "2023-03-10",
      status: "closed",
      views: 320,
      proposals: 15,
      deadline: "2023-04-10",
    },
    {
      id: 4,
      title: "카페 시즌 메뉴 콜라보 IP 모집",
      date: "2023-02-05",
      status: "closed",
      views: 178,
      proposals: 6,
      deadline: "2023-03-05",
    },
    {
      id: 5,
      title: "레스토랑 브랜딩을 위한 캐릭터 IP 모집",
      date: "2023-01-25",
      status: "expired",
      views: 210,
      proposals: 9,
      deadline: "2023-02-25",
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold">내가 쓴 글 목록</h1>
        <Link href="#" className="button button-primary">
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
          새 모집 공고 작성
        </Link>
      </div>

      <div className="mb-6 flex flex-col md-flex-row gap-4">
        <div className="flex-1">
          <input className="input" placeholder="제목, 내용으로 검색" />
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="all">상태</option>
            <option value="active">진행중</option>
            <option value="closed">마감</option>
            <option value="expired">기간만료</option>
          </select>
        </div>
        <div className="w-full" style={{ maxWidth: "180px" }}>
          <select className="select">
            <option value="newest">정렬</option>
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회수순</option>
            <option value="proposals">제안수순</option>
          </select>
        </div>
      </div>

      <div className="tabs mb-6">
        <div className="tabs-list">
          <div className="tab active" data-tab="all">
            전체 ({posts.length})
          </div>
          <div className="tab" data-tab="active">
            진행중 ({posts.filter((p) => p.status === "active").length})
          </div>
          <div className="tab" data-tab="closed">
            마감 ({posts.filter((p) => p.status === "closed").length})
          </div>
          <div className="tab" data-tab="expired">
            기간만료 ({posts.filter((p) => p.status === "expired").length})
          </div>
        </div>

        <div className="tab-content active" id="all">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">모집 공고 목록</h3>
              <p className="card-description">
                내가 작성한 모든 모집 공고 목록입니다.
              </p>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="item-card">
                    <div className="flex flex-col md-flex-row md-items-center justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.title}</h3>
                          {post.status === "active" && (
                            <span className="badge badge-success">진행중</span>
                          )}
                          {post.status === "closed" && (
                            <span className="badge badge-outline">마감</span>
                          )}
                          {post.status === "expired" && (
                            <span className="badge badge-secondary">
                              기간만료
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted mt-1">
                          작성일: {post.date} · 마감일: {post.deadline}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted">
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
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </span>
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted">
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
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </span>
                          {post.proposals}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link
                        href={`#view-${post.id}`}
                        className="button button-outline button-sm"
                      >
                        상세보기
                      </Link>
                      <Link
                        href={`/received-proposals?postId=${post.id}`}
                        className="button button-outline button-sm"
                      >
                        제안 보기 ({post.proposals})
                      </Link>
                      {post.status === "active" && (
                        <>
                          <Link
                            href={`#edit-${post.id}`}
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
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </span>
                            수정
                          </Link>
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
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </span>
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="tab-content" id="active">
          {/* 진행중인 공고 내용 - 위와 유사한 구조 */}
        </div>

        <div className="tab-content" id="closed">
          {/* 마감된 공고 내용 - 위와 유사한 구조 */}
        </div>

        <div className="tab-content" id="expired">
          {/* 기간만료 공고 내용 - 위와 유사한 구조 */}
        </div>
      </div>
    </div>
  );
}
