"use client"

import { useState, useEffect } from "react"
import { profileAPI, tagAPI, regionAPI } from "../api"
import ProfileCard from "../components/ProfileCard"
import ProfileDetailModal from "../components/ProfileDetailModal"
import "./MainPage.css"

const MainPage = () => {
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [profileType, setProfileType] = useState("store")
  const [tags, setTags] = useState([])
  const [ipTags, setIpTags] = useState([])
  const [storeTags, setStoreTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [filters, setFilters] = useState({
    tags: [],
    regions: [],
  })
  const [isSearched, setIsSearched] = useState(false)

  // 태그 검색 관련 상태
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTags, setFilteredTags] = useState([])

  // 지역 선택 관련 상태
  const [provinces, setProvinces] = useState([]) // 시도
  const [districts, setDistricts] = useState([]) // 시군구
  const [neighborhoods, setNeighborhoods] = useState([]) // 동읍면
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)
  const [selectedRegions, setSelectedRegions] = useState([])

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

  // 태그 필터링
  useEffect(() => {
    const currentTags = getCurrentTags()
    if (searchTerm.trim() === "") {
      setFilteredTags(currentTags)
    } else {
      const filtered = currentTags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredTags(filtered)
    }
  }, [searchTerm, profileType, tags, ipTags, storeTags])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 태그 데이터 가져오기 (전체, IP, 매장별로 구분)
        const tagsResponse = await tagAPI.getAllTags()
        const allTags = tagsResponse.data || []
        setTags(allTags)
        setIpTags(allTags.filter((tag) => tag.type === "IP"))
        setStoreTags(allTags.filter((tag) => tag.type === "STORE"))

        // 초기 태그 필터링 설정
        setFilteredTags(allTags.filter((tag) => tag.type === "STORE"))

        // 지역 데이터 가져오기 (시도)
        try {
          const provincesResponse = await regionAPI.getAddress()
          console.log(provincesResponse.data.result)
          setProvinces(provincesResponse.data.result)
        } catch (error) {
          console.error("Error fetching provinces:", error)
        }

        // 초기 데이터 로드 - 기본 타입(store)에 맞는 프로필 조회
        // 실제 API 호출 대신 더미 데이터 사용
        setProfiles(dummyProfiles)
        setFilteredProfiles(dummyProfiles.filter((profile) => profile.type === "STORE"))
      } catch (error) {
        console.error("Error fetching data:", error)
        setFilteredTags(dummyProfiles.filter((p) => p.type === "STORE").flatMap((profile) => profile.tags))
        setProfiles(dummyProfiles)
        setFilteredProfiles(dummyProfiles.filter((profile) => profile.type === "STORE"))
      }
    }

    fetchData()
  }, [])

  // 시군구 데이터 가져오기
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) {
        setDistricts([])
        setSelectedDistrict(null)
        return
      }

      try {
        const response = await regionAPI.getAddress(selectedProvince.cd)
        setDistricts(response.data.result)
        setSelectedDistrict(null)
        setNeighborhoods([])
      } catch (error) {
        console.error("Error fetching districts:", error)
      }
    }

    fetchDistricts()
  }, [selectedProvince])

  // 동읍면 데이터 가져오기
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      if (!selectedDistrict) {
        setNeighborhoods([])
        setSelectedNeighborhood(null)
        return
      }

      try {
        const response = await regionAPI.getAddress(selectedDistrict.cd)
        setNeighborhoods(response.data.result)
        setSelectedNeighborhood(null)
      } catch (error) {
        console.error("Error fetching neighborhoods:", error)
      }
    }

    fetchNeighborhoods()
  }, [selectedDistrict])

  const fetchProfiles = async () => {
    try {
      // 검색 버튼을 누르지 않았다면 API 호출 안함
      if (!isSearched) {
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

    // 태그 필터링 업데이트
    if (type === "ip") {
      setFilteredTags(ipTags)
    } else if (type === "store") {
      setFilteredTags(storeTags)
    }

    // 더미 데이터 필터링
    if (type === "ip") {
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

  // 태그 선택/해제 처리
  const handleTagToggle = (tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id)

    if (isSelected) {
      const newTags = selectedTags.filter((t) => t.id !== tag.id)
      setSelectedTags(newTags)
      setFilters((prev) => ({
        ...prev,
        tags: newTags.map((t) => t.id),
      }))
    } else {
      const newTags = [...selectedTags, tag]
      setSelectedTags(newTags)
      setFilters((prev) => ({
        ...prev,
        tags: newTags.map((t) => t.id),
      }))
    }
  }

  // 지역 추가 처리
  const handleAddRegion = () => {
    // 선택된 지역 정보 생성
    let regionToAdd = null
    let fullName = ""

    if (selectedNeighborhood) {
      regionToAdd = selectedNeighborhood
      fullName = `${selectedProvince.addr_name} ${selectedDistrict.addr_name} ${selectedNeighborhood.addr_name}`
    } else if (selectedDistrict) {
      regionToAdd = selectedDistrict
      fullName = `${selectedProvince.addr_name} ${selectedDistrict.addr_name}`
    } else if (selectedProvince) {
      regionToAdd = selectedProvince
      fullName = selectedProvince.addr_name
    }

    if (regionToAdd) {
      // 이미 선택된 지역인지 확인
      const alreadySelected = selectedRegions.some((region) => region.cd === regionToAdd.cd)

      if (!alreadySelected) {
        const newRegion = {
          ...regionToAdd,
          fullName,
        }

        const updatedRegions = [...selectedRegions, newRegion]
        setSelectedRegions(updatedRegions)
        setFilters((prev) => ({
          ...prev,
          regions: updatedRegions.map((r) => r.cd),
        }))
      }
    }
  }

  // 지역 제거 처리
  const handleRemoveRegion = (regionId) => {
    const updatedRegions = selectedRegions.filter((region) => region.cd !== regionId)
    setSelectedRegions(updatedRegions)
    setFilters((prev) => ({
      ...prev,
      regions: updatedRegions.map((r) => r.cd),
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
        return storeTags
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

        <div className={`filter-options ${profileType === "ip" ? "ip-filter" : ""}`}>
          {/* 태그 선택 영역 */}
          <div className="filter-option-section">
            <h3 className="filter-title">태그 선택</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="태그 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="tags-container main-tags-container">
              {filteredTags.length === 0 ? (
                <p className="no-tags">검색 결과가 없습니다.</p>
              ) : (
                filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`tag-item main-tag ${selectedTags.some((t) => t.id === tag.id) ? "selected" : ""}`}
                    onClick={() => handleTagToggle(tag)}
                    title={tag.name}
                  >
                    {tag.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 지역 선택 영역 - 매장 타입일 때만 표시 */}
          {profileType === "store" && (
            <div className="filter-option-section">
              <h3 className="filter-title">지역 선택</h3>
              <div className="region-dropdowns">
                <div className="region-dropdown">
                  <label>시/도</label>
                  <select
                    value={selectedProvince?.cd || ""}
                    onChange={(e) => {
                      const province = provinces.find((p) => p.cd === e.target.value)
                      setSelectedProvince(province || null)
                    }}
                  >
                    <option value="">선택하세요</option>
                    {provinces.map((province) => (
                      <option key={province.cd} value={province.cd}>
                        {province.addr_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="region-dropdown">
                  <label>시/군/구</label>
                  <select
                    value={selectedDistrict?.cd || ""}
                    onChange={(e) => {
                      const district = districts.find((d) => d.cd === e.target.value)
                      setSelectedDistrict(district || null)
                    }}
                    disabled={!selectedProvince}
                  >
                    <option value="">선택하세요</option>
                    {districts.map((district) => (
                      <option key={district.cd} value={district.cd}>
                        {district.addr_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="region-dropdown">
                  <label>읍/면/동</label>
                  <select
                    value={selectedNeighborhood?.cd || ""}
                    onChange={(e) => {
                      const neighborhood = neighborhoods.find((n) => n.cd === e.target.value)
                      setSelectedNeighborhood(neighborhood || null)
                    }}
                    disabled={!selectedDistrict}
                  >
                    <option value="">선택하세요</option>
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood.cd} value={neighborhood.cd}>
                        {neighborhood.addr_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="region-actions">
                <button className="btn btn-add-region" onClick={handleAddRegion} disabled={!selectedProvince}>
                  지역 추가
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 선택된 태그 표시 */}
        {selectedTags.length > 0 && (
          <div className="selected-items">
            <h4>선택된 태그:</h4>
            <div className="item-tags">
              {selectedTags.map((tag) => (
                <span key={tag.id} className="item-tag tag-color">
                  {tag.name}
                  <button className="remove-item" onClick={() => handleTagToggle(tag)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 선택된 지역 표시 */}
        {selectedRegions.length > 0 && profileType === "store" && (
          <div className="selected-items">
            <h4>선택된 지역:</h4>
            <div className="item-tags">
              {selectedRegions.map((region) => (
                <span key={region.cd} className="item-tag region-color">
                  {region.fullName}
                  <button className="remove-item" onClick={() => handleRemoveRegion(region.cd)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 검색 버튼 */}
        <div className="search-button-container">
          <button className="btn btn-search" onClick={handleSearch}>
            검색
          </button>
        </div>
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
    </div>
  )
}

export default MainPage
