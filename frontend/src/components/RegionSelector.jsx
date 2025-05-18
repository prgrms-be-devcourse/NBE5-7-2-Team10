"use client"

import { useState, useEffect } from "react"
import { regionAPI } from "../api"
import "./RegionSelector.css"

const RegionSelector = ({ onRegionSelect, onClose, selectedRegions = [] }) => {
  const [provinces, setProvinces] = useState([]) // 시도
  const [districts, setDistricts] = useState([]) // 시군구
  const [neighborhoods, setNeighborhoods] = useState([]) // 동읍면

  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)

  const [localSelectedRegions, setLocalSelectedRegions] = useState([])

  useEffect(() => {
    setLocalSelectedRegions(selectedRegions)
  }, [selectedRegions])

  useEffect(() => {
    // 시도 목록 가져오기
    const fetchProvinces = async () => {
      try {
        const response = await regionAPI.getProvinces()
        setProvinces(response.data)
      } catch (error) {
        console.error("Error fetching provinces:", error)
      }
    }

    fetchProvinces()
  }, [])

  useEffect(() => {
    // 시군구 목록 가져오기
    const fetchDistricts = async () => {
      if (!selectedProvince) {
        setDistricts([])
        return
      }

      try {
        const response = await regionAPI.getDistricts(selectedProvince.id)
        setDistricts(response.data)
        setSelectedDistrict(null)
        setNeighborhoods([])
      } catch (error) {
        console.error("Error fetching districts:", error)
      }
    }

    fetchDistricts()
  }, [selectedProvince])

  useEffect(() => {
    // 동읍면 목록 가져오기
    const fetchNeighborhoods = async () => {
      if (!selectedDistrict) {
        setNeighborhoods([])
        return
      }

      try {
        const response = await regionAPI.getNeighborhoods(selectedDistrict.id)
        setNeighborhoods(response.data)
        setSelectedNeighborhood(null)
      } catch (error) {
        console.error("Error fetching neighborhoods:", error)
      }
    }

    fetchNeighborhoods()
  }, [selectedDistrict])

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province)
  }

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district)
  }

  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood)
  }

  const handleAddRegion = () => {
    // 선택된 지역 정보 생성
    let regionToAdd = null
    let fullName = ""

    if (selectedNeighborhood) {
      regionToAdd = selectedNeighborhood
      fullName = `${selectedProvince.name} ${selectedDistrict.name} ${selectedNeighborhood.name}`
    } else if (selectedDistrict) {
      regionToAdd = selectedDistrict
      fullName = `${selectedProvince.name} ${selectedDistrict.name}`
    } else if (selectedProvince) {
      regionToAdd = selectedProvince
      fullName = selectedProvince.name
    }

    if (regionToAdd) {
      // 이미 선택된 지역인지 확인
      const alreadySelected = localSelectedRegions.some((region) => region.id === regionToAdd.id)

      if (!alreadySelected) {
        const newRegion = {
          ...regionToAdd,
          fullName,
        }

        const updatedRegions = [...localSelectedRegions, newRegion]
        setLocalSelectedRegions(updatedRegions)
      }
    }

    // 선택 초기화
    setSelectedProvince(null)
    setSelectedDistrict(null)
    setSelectedNeighborhood(null)
  }

  const handleRemoveRegion = (regionId) => {
    const updatedRegions = localSelectedRegions.filter((region) => region.id !== regionId)
    setLocalSelectedRegions(updatedRegions)
  }

  const handleApply = () => {
    onRegionSelect(localSelectedRegions)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const handleClearAll = () => {
    setLocalSelectedRegions([])
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="region-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>지역 선택</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="region-selector-content">
          <div className="region-columns">
            <div className="region-column">
              <h4>시도</h4>
              <div className="region-list">
                {provinces.map((province) => (
                  <div
                    key={province.id}
                    className={`region-item ${selectedProvince?.id === province.id ? "selected" : ""}`}
                    onClick={() => handleProvinceSelect(province)}
                  >
                    {province.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="region-column">
              <h4>시군구</h4>
              <div className="region-list">
                {districts.map((district) => (
                  <div
                    key={district.id}
                    className={`region-item ${selectedDistrict?.id === district.id ? "selected" : ""}`}
                    onClick={() => handleDistrictSelect(district)}
                  >
                    {district.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="region-column">
              <h4>동읍면</h4>
              <div className="region-list">
                {neighborhoods.map((neighborhood) => (
                  <div
                    key={neighborhood.id}
                    className={`region-item ${selectedNeighborhood?.id === neighborhood.id ? "selected" : ""}`}
                    onClick={() => handleNeighborhoodSelect(neighborhood)}
                  >
                    {neighborhood.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="region-actions">
            <button className="btn btn-primary" onClick={handleAddRegion} disabled={!selectedProvince}>
              지역 추가
            </button>
          </div>

          {localSelectedRegions.length > 0 && (
            <div className="selected-regions-container">
              <h4>선택된 지역</h4>
              <div className="selected-regions-list">
                {localSelectedRegions.map((region) => (
                  <div key={region.id} className="selected-region-item">
                    <span>{region.fullName}</span>
                    <button className="remove-region" onClick={() => handleRemoveRegion(region.id)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClearAll}>
            전체 해제
          </button>
          <div>
            <button className="btn btn-secondary" onClick={handleCancel}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleApply}>
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegionSelector
