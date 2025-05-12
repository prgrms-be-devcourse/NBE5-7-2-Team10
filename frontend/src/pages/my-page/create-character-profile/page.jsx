import { Link } from 'react-router-dom';
import '../../globals.css';

export default function CreateCharacterProfile() {
  return (
    <div className="container py-10">
      <div className="card max-width-800 mx-auto">
        <div className="card-header">
          <h2 className="card-title">새 캐릭터 프로필 생성</h2>
          <p className="card-description">
            새로운 캐릭터 프로필을 생성하세요. IP 제공자는 여러 개의 캐릭터 프로필을 만들 수 있습니다.
          </p>
        </div>
        <div className="card-content">
          <form className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">기본 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="profileImage">
                  캐릭터 이미지
                </label>
                <div className="flex items-center gap-4">
                  <div className="avatar avatar-large">
                    <img src="/placeholder.svg?height=80&width=80&text=캐릭터" alt="캐릭터 이미지" />
                  </div>
                  <div className="space-y-2">
                    <button type="button" className="button button-outline button-sm">
                      이미지 업로드
                    </button>
                    <button type="button" className="button button-outline button-sm button-danger">
                      이미지 삭제
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted">대표 캐릭터 이미지를 업로드하세요. (권장 크기: 500x500px)</p>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="characterName">
                  캐릭터 이름
                </label>
                <input className="input" id="characterName" placeholder="캐릭터 이름을 입력하세요" />
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="characterType">
                  캐릭터 유형
                </label>
                <select className="select" id="characterType">
                  <option value="">캐릭터 유형 선택</option>
                  <option value="mascot">마스코트</option>
                  <option value="animal">동물</option>
                  <option value="human">인간형</option>
                  <option value="fantasy">판타지</option>
                  <option value="food">음식</option>
                  <option value="object">사물</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="shortDescription">
                  짧은 소개
                </label>
                <input className="input" id="shortDescription" placeholder="캐릭터에 대한 짧은 소개를 입력하세요" />
                <p className="text-sm text-muted">50자 이내로 작성하세요.</p>
              </div>
            </div>

            <div className="separator"></div>

            {/* 상세 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">상세 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="fullDescription">
                  상세 설명
                </label>
                <textarea
                  className="textarea"
                  id="fullDescription"
                  placeholder="캐릭터에 대한 상세 설명을 입력하세요"
                  rows="5"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="personality">
                  캐릭터 성격
                </label>
                <textarea
                  className="textarea"
                  id="personality"
                  placeholder="캐릭터의 성격, 특징을 입력하세요"
                  rows="3"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="story">
                  캐릭터 스토리
                </label>
                <textarea
                  className="textarea"
                  id="story"
                  placeholder="캐릭터의 배경 스토리를 입력하세요"
                  rows="4"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="targetAudience">
                  타겟 고객층
                </label>
                <select className="select" id="targetAudience">
                  <option value="">타겟 고객층 선택</option>
                  <option value="children">어린이 (0-12세)</option>
                  <option value="teenagers">청소년 (13-19세)</option>
                  <option value="young-adults">젊은 성인 (20-35세)</option>
                  <option value="adults">성인 (36-50세)</option>
                  <option value="seniors">시니어 (51세 이상)</option>
                  <option value="all">전 연령층</option>
                </select>
              </div>
            </div>

            <div className="separator"></div>

            {/* 콜라보레이션 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">콜라보레이션 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="collaborationTypes">
                  선호하는 콜라보레이션 유형
                </label>
                <div className="flex flex-wrap gap-2">
                  {["메뉴 콜라보", "인테리어/공간", "굿즈 제작", "이벤트/프로모션", "브랜딩", "패키지 디자인"].map(
                    (type, index) => (
                      <label key={index} className="flex items-center gap-1 border rounded px-2 py-1">
                        <input type="checkbox" className="checkbox" name="collaborationTypes" value={type} />
                        <span>{type}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="preferredBusinessTypes">
                  선호하는 비즈니스 유형
                </label>
                <div className="flex flex-wrap gap-2">
                  {["카페", "레스토랑", "베이커리", "디저트", "패스트푸드", "주점", "편의점", "팝업스토어"].map(
                    (type, index) => (
                      <label key={index} className="flex items-center gap-1 border rounded px-2 py-1">
                        <input type="checkbox" className="checkbox" name="preferredBusinessTypes" value={type} />
                        <span>{type}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="pastCollaborations">
                  과거 콜라보레이션 경험
                </label>
                <textarea
                  className="textarea"
                  id="pastCollaborations"
                  placeholder="과거 콜라보레이션 경험이 있다면 소개해주세요"
                  rows="3"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="collaborationIdeas">
                  콜라보레이션 아이디어
                </label>
                <textarea
                  className="textarea"
                  id="collaborationIdeas"
                  placeholder="이 캐릭터로 가능한 콜라보레이션 아이디어를 제안해주세요"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="separator"></div>

            {/* 추가 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">추가 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="additionalImages">
                  추가 이미지
                </label>
                <div className="file-upload">
                  <input type="file" id="additionalImages" multiple className="file-input" />
                  <label htmlFor="additionalImages" className="file-label">
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </span>
                    <span>이미지 선택 (최대 10개)</span>
                  </label>
                  <p className="text-sm text-muted mt-1">
                    캐릭터의 다양한 포즈, 표정, 활용 예시 등의 이미지를 업로드하세요.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="tags">
                  태그
                </label>
                <input className="input" id="tags" placeholder="관련 태그를 입력하세요 (쉼표로 구분)" />
                <p className="text-sm text-muted">예: 귀여운, 동물, 힐링, 유머, 감성</p>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="visibility">
                  프로필 공개 설정
                </label>
                <select className="select" id="visibility">
                  <option value="public">공개 (모든 사용자에게 공개)</option>
                  <option value="limited">제한 공개 (초대된 사용자에게만 공개)</option>
                  <option value="private">비공개 (나만 볼 수 있음)</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="flex gap-3 justify-end">
            <Link href="/my-page" className="button button-outline">
              취소
            </Link>
            <button className="button button-primary">프로필 생성</button>
          </div>
        </div>
      </div>
    </div>
  )
}
