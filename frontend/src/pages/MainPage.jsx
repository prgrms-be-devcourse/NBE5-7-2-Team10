"use client"

import { useState, useEffect } from "react"
import { profileAPI, tagAPI } from "../api"
import ProfileCard from "../components/ProfileCard"
import ProfileDetailModal from "../components/ProfileDetailModal"
import RegionSelector from "../components/RegionSelector"
import TagSelector from "../components/TagSelector"
import "./MainPage.css"

const MainPage = () => {
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [profileType, setProfileType] = useState("all")
  const [tags, setTags] = useState([])
  const [ipTags, setIpTags] = useState([])
  const [storeTags, setStoreTags] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showRegionSelector, setShowRegionSelector] = useState(false)
  const [showTagSelector, setShowTagSelector] = useState(false)
  const [filters, setFilters] = useState({
    tags: [],
    regions: [],
  })
  const [isSearched, setIsSearched] = useState(false)

  // 테스트용 더미 데이터
  const dummyProfiles = [
    {
      id: "dummy-1",
      name: "테스트 IP 캐릭터",
      type: "IP",
      description: "귀여운 캐릭터입니다. 다양한 콜라보레이션 경험이 있습니다.",
      region: "서울 강남구",
      imageUrl: "/placeholder-profile.png",
      tags: [
        { id: "tag-1", name: "캐릭터" },
        { id: "tag-2", name: "귀여움" },
      ],
    },
    {
      id: "dummy-2",
      name: "테스트 매장",
      type: "STORE",
      description: "트렌디한 카페입니다. IP 캐릭터와의 콜라보를 원합니다.",
      region: "서울 마포구",
      imageUrl: "/placeholder-profile.png",
      tags: [
        { id: "tag-3", name: "카페" },
        { id: "tag-4", name: "디저트" },
      ],
    },
    {
      id: "dummy-3",
      name: "인기 IP 캐릭터",
      type: "IP",
      description: "인기 있는 캐릭터로 다양한 제품에 활용 가능합니다.",
      region: "부산 해운대구",
      imageUrl: "/placeholder-profile.png",
      tags: [
        { id: "tag-5", name: "인기" },
        { id: "tag-6", name: "캐릭터" },
      ],
    },
    {
      id: "dummy-4",
      name: "트렌디 레스토랑",
      type: "STORE",
      description: "모던한 분위기의 레스토랑입니다. 특별한 콜라보를 찾고 있습니다.",
      region: "인천 연수구",
      imageUrl: "/placeholder-profile.png",
      tags: [
        { id: "tag-7", name: "레스토랑" },
        { id: "tag-8", name: "모던" },
      ],
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 태그 데이터 가져오기 (전체, IP, 매장별로 구분)
        const tagsResponse = await tagAPI.getAllTags()
        const allTags = tagsResponse.data || []

        setTags(allTags)
        setIpTags(allTags.filter((tag) => tag.type === "IP"))
        setStoreTags(allTags.filter((tag) => tag.type === "STORE"))

        // 초기 데이터 로드 - 항상 전체 프로필 조회
        // 실제 API 호출 대신 더미 데이터 사용
        setProfiles(dummyProfiles)
        setFilteredProfiles(dummyProfiles)

        /* 실제 API 호출 코드 (필요시 주석 해제)
        try {
          // 전체 프로필 조회 API 호출
          const [ipResponse, storeResponse] = await Promise.all([
            profileAPI.getIPProfiles({}),
            profileAPI.getStoreProfiles({}),
          ]);
          
          const allProfiles = [...ipResponse.data, ...storeResponse.data];
          setProfiles(allProfiles);
          setFilteredProfiles(allProfiles);
        } catch (apiError) {
          console.error("API Error:", apiError);
          // API 오류 시 더미 데이터 사용
          setProfiles(dummyProfiles);
          setFilteredProfiles(dummyProfiles);
        }
        */
      } catch (error) {
        console.error("Error fetching data:", error)
        // 오류 발생 시 더미 데이터 사용
        setProfiles(dummyProfiles)
        setFilteredProfiles(dummyProfiles)
      }
    }

    fetchData()
  }, [])

  const fetchProfiles = async () => {
    try {
      // 검색 버튼을 누르지 않았다면 API 호출 안함
      if (!isSearched && profileType !== "all") {
        return
      }

      let response
      if (profileType === "ip") {
        response = await profileAPI.getIPProfiles({
          tags: filters.tags,
          regions: filters.regions,
        })
      } else if (profileType === "store") {
        response = await profileAPI.getStoreProfiles({
          tags: filters.tags,
          regions: filters.regions,
        })
      } else {
        // Fetch both types and combine
        const [ipResponse, storeResponse] = await Promise.all([
          profileAPI.getIPProfiles({
            tags: filters.tags,
            regions: filters.regions,
          }),
          profileAPI.getStoreProfiles({
            tags: filters.tags,
            regions: filters.regions,
          }),
        ])

        response = {
          data: [...ipResponse.data, ...storeResponse.data],
        }
      }

      setProfiles(response.data)
      setFilteredProfiles(response.data)
    } catch (error) {
      console.error("Error fetching profiles:", error)

      // API 오류 시 더미 데이터로 대체
      let filteredDummies = [...dummyProfiles]

      // 프로필 타입에 따라 필터링
      if (profileType === "ip") {
        filteredDummies = filteredDummies.filter((profile) => profile.type === "IP")
      } else if (profileType === "store") {
        filteredDummies = filteredDummies.filter((profile) => profile.type === "STORE")
      }

      // 태그 필터링 (실제로는 백엔드에서 처리)
      if (filters.tags.length > 0) {
        filteredDummies = filteredDummies.filter((profile) => profile.tags.some((tag) => filters.tags.includes(tag.id)))
      }

      setProfiles(filteredDummies)
      setFilteredProfiles(filteredDummies)
    }
  }

  // 검색 버튼 클릭 시에만 API 호출
  const handleSearch = () => {
    setIsSearched(true)
    fetchProfiles()
  }

  // 프로필 타입 변경 시 필터 초기화
  const handleProfileTypeChange = (type) => {
    setProfileType(type)
    setSelectedTags([])
    setSelectedRegions([])
    setFilters({
      tags: [],
      regions: [],
    })
    setIsSearched(false)

    // 더미 데이터 필터링
    if (type === "all") {
      setFilteredProfiles(dummyProfiles)
    } else if (type === "ip") {
      setFilteredProfiles(dummyProfiles.filter((profile) => profile.type === "IP"))
    } else if (type === "store") {
      setFilteredProfiles(dummyProfiles.filter((profile) => profile.type === "STORE"))
    }
  }

  const handleProfileClick = async (profileId) => {
    try {
      // 더미 데이터에서 프로필 찾기
      const dummyProfile = dummyProfiles.find((p) => p.id === profileId)
      if (dummyProfile) {
        setSelectedProfile(dummyProfile)
        setShowModal(true)
        return
      }

      // 실제 API 호출
      const response = await profileAPI.getProfile(profileId)
      setSelectedProfile(response.data)
      setShowModal(true)
    } catch (error) {
      console.error("Error fetching profile details:", error)
    }
  }

  const handleRegionSelect = (regions) => {
    setSelectedRegions(regions)
    setFilters((prev) => ({
      ...prev,
      regions: regions.map((r) => r.id),
    }))
  }

  const handleTagSelect = (tags) => {
    setSelectedTags(tags)
    setFilters((prev) => ({
      ...prev,
      tags: tags.map((t) => t.id),
    }))
  }

  // 현재 프로필 타입에 따라 표시할 태그 목록 선택
  const getCurrentTags = () => {
    switch (profileType) {
      case "ip":
        return ipTags
      case "store":
        return storeTags
      default:
        return tags
    }
  }

  return (
    <div className="main-page">
      <section className="hero-section">
        <h1>Collabond</h1>
        <p>점주와 IP제공자를 위한 매칭 플랫폼</p>
      </section>

      <section className="filter-section">
        <div className="profile-type-filter">
          <button
            className={`btn ${profileType === "all" ? "btn-primary" : ""}`}
            onClick={() => handleProfileTypeChange("all")}
          >
            전체
          </button>
          <button
            className={`btn ${profileType === "store" ? "btn-recruitment" : ""}`}
            onClick={() => handleProfileTypeChange("store")}
          >
            매장
          </button>
          <button
            className={`btn ${profileType === "ip" ? "btn-ip" : ""}`}
            onClick={() => handleProfileTypeChange("ip")}
          >
            IP 캐릭터
          </button>
        </div>

        {profileType !== "all" && (
          <div className="filter-buttons">
            {/* IP 캐릭터 또는 매장일 때만 태그 선택 표시 */}
            <button className="btn btn-filter" onClick={() => setShowTagSelector(true)}>
              태그 선택 {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>

            {/* 매장일 때만 지역 선택 표시 */}
            {profileType === "store" && (
              <button className="btn btn-filter" onClick={() => setShowRegionSelector(true)}>
                지역 선택 {selectedRegions.length > 0 && `(${selectedRegions.length})`}
              </button>
            )}

            {/* 검색 버튼 */}
            <button className="btn btn-search" onClick={handleSearch}>
              검색
            </button>
          </div>
        )}

        {selectedTags.length > 0 && (
          <div className="selected-items">
            <h4>선택된 태그:</h4>
            <div className="item-tags">
              {selectedTags.map((tag) => (
                <span key={tag.id} className="item-tag tag-color">
                  {tag.name}
                  <button
                    className="remove-item"
                    onClick={() => {
                      const newTags = selectedTags.filter((t) => t.id !== tag.id)
                      handleTagSelect(newTags)
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedRegions.length > 0 && profileType === "store" && (
          <div className="selected-items">
            <h4>선택된 지역:</h4>
            <div className="item-tags">
              {selectedRegions.map((region) => (
                <span key={region.id} className="item-tag region-color">
                  {region.fullName}
                  <button
                    className="remove-item"
                    onClick={() => {
                      const newRegions = selectedRegions.filter((r) => r.id !== region.id)
                      handleRegionSelect(newRegions)
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="profiles-section">
        <h2 className="section-title">프로필 목록</h2>

        {filteredProfiles.length === 0 ? (
          <div className="no-profiles">
            <p>검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="profiles-grid">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} onClick={() => handleProfileClick(profile.id)} />
            ))}
          </div>
        )}
      </section>

      {showModal && selectedProfile && (
        <ProfileDetailModal profile={selectedProfile} onClose={() => setShowModal(false)} />
      )}

      {showRegionSelector && (
        <RegionSelector
          onRegionSelect={handleRegionSelect}
          onClose={() => setShowRegionSelector(false)}
          selectedRegions={selectedRegions}
        />
      )}

      {showTagSelector && (
        <TagSelector
          tags={getCurrentTags()}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onClose={() => setShowTagSelector(false)}
        />
      )}
    </div>
  )
}

export default MainPage
