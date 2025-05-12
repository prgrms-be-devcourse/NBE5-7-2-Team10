import { Link } from 'react-router-dom';
import '../../globals.css';

export default function CreateStoreProfile() {
  return (
    <div className="container py-10">
      <div className="card max-width-800 mx-auto">
        <div className="card-header">
          <h2 className="card-title">가게 프로필 생성</h2>
          <p className="card-description">가게 프로필을 생성하세요. 점주는 하나의 가게 프로필만 가질 수 있습니다.</p>
        </div>
        <div className="card-content">
          <form className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">기본 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="storeImage">
                  가게 이미지
                </label>
                <div className="flex items-center gap-4">
                  <div className="avatar avatar-large">
                    <img src="/placeholder.svg?height=80&width=80&text=가게" alt="가게 이미지" />
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
                <p className="text-sm text-muted">가게 대표 이미지를 업로드하세요. (권장 크기: 500x500px)</p>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="storeName">
                  가게 이름
                </label>
                <input className="input" id="storeName" placeholder="가게 이름을 입력하세요" />
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="businessType">
                  업종
                </label>
                <select className="select" id="businessType">
                  <option value="">업종 선택</option>
                  <option value="cafe">카페</option>
                  <option value="restaurant">레스토랑</option>
                  <option value="bakery">베이커리</option>
                  <option value="dessert">디저트</option>
                  <option value="fastfood">패스트푸드</option>
                  <option value="bar">주점</option>
                  <option value="convenience">편의점</option>
                  <option value="popup">팝업스토어</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="shortDescription">
                  짧은 소개
                </label>
                <input className="input" id="shortDescription" placeholder="가게에 대한 짧은 소개를 입력하세요" />
                <p className="text-sm text-muted">50자 이내로 작성하세요.</p>
              </div>
            </div>

            <div className="separator"></div>

            {/* 위치 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="font-semibold">위치 정보</h3>

              <div className="space-y-2">
                <label className="label" htmlFor="address">
                  주소
                </label>
                <input className="input" id="address" placeholder="가게 주소를 입력하세요" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label" htmlFor="city">
                    시/도
                  </label>
                  <input className="input" id="city" placeholder="시/도" />
                </div>
                <div className="space-y-2">
                  <label className="label" htmlFor="district">
                    구/군
                  </label>
                  <input className="input" id="district" placeholder="구/군" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="phoneNumber">
                  전화번호
                </label>
                <input className="input" id="phoneNumber" placeholder="가게 전화번호를 입력하세요" />
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="website">
                  웹사이트 (선택사항)
                </label>
                <input className="input" id="website" placeholder="가게 웹사이트 URL을 입력하세요" />
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
                  placeholder="가게에 대한 상세 설명을 입력하세요"
                  rows="5"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="businessHours">
                  영업 시간
                </label>
                <textarea
                  className="textarea"
                  id="businessHours"
                  placeholder="영업 시간을 입력하세요 (예: 월-금: 9AM-10PM, 토-일: 10AM-9PM)"
                  rows="3"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="mainMenu">
                  주요 메뉴/상품
                </label>
                <textarea
                  className="textarea"
                  id="mainMenu"
                  placeholder="주요 메뉴나 상품을 소개해주세요"
                  rows="4"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="targetCustomers">
                  주요 고객층
                </label>
                <select className="select" id="targetCustomers">
                  <option value="">주요 고객층 선택</option>
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
                  관심 있는 콜라보레이션 유형
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
                <label className="label" htmlFor="preferredCharacterTypes">
                  선호하는 캐릭터 유형
                </label>
                <div className="flex flex-wrap gap-2">
                  {["마스코트", "동물", "인간형", "판타지", "음식", "사물", "귀여운", "심플한"].map((type, index) => (
                    <label key={index} className="flex items-center gap-1 border rounded px-2 py-1">
                      <input type="checkbox" className="checkbox" name="preferredCharacterTypes" value={type} />
                      <span>{type}</span>
                    </label>
                  ))}
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
                  placeholder="어떤 콜라보레이션을 원하시는지 아이디어를 공유해주세요"
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
                    가게 내부/외부, 메뉴, 분위기 등을 보여주는 이미지를 업로드하세요.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="socialMedia">
                  소셜 미디어
                </label>
                <div className="space-y-2">
                  <input className="input" placeholder="인스타그램 URL" />
                  <input className="input" placeholder="페이스북 URL" />
                  <input className="input" placeholder="기타 소셜 미디어" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="tags">
                  태그
                </label>
                <input className="input" id="tags" placeholder="관련 태그를 입력하세요 (쉼표로 구분)" />
                <p className="text-sm text-muted">예: 분위기좋은, 데이트, 인스타감성, 맛집, 핫플레이스</p>
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
