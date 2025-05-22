"use client";

import { useEffect, useState } from "react";
import { regionAPI } from "../api";
import "./RegionSelector.css";

const SingleRegionSelector = ({ initialCode, onSelect }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

  // 1) 도/특별시 목록 불러오기
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await regionAPI.getProvinces();
      // res.data.result 안에 [{ cd, ctp_kor, … }, …] 형태로 내려옴
      const items = (res.data.result || []).map((r) => ({
        id: r.cd,                    // 내부 구분용
        code: r.cd,                  // 법정동 코드
        name: r.ctp_kor || r.ctp_nm, // 도/특별시 명
      }));
      setProvinces(items);
    };
    fetchProvinces();
  }, []);

  // 2) 시/군/구 목록 불러오기
  useEffect(() => {
    if (!selectedProvince) return;
    const fetchDistricts = async () => {
      const res = await regionAPI.getDistricts(selectedProvince.code);
      const items = (res.data.result || []).map((r) => ({
        id: r.cd,
        code: r.cd,
        name: r.sigungu_kor || r.sigungu_nm,
      }));
      setDistricts(items);
      setSelectedDistrict(null);
      setNeighborhoods([]);
    };
    fetchDistricts();
  }, [selectedProvince]);

  // 3) 읍/면/동 목록 불러오기
  useEffect(() => {
    if (!selectedDistrict) return;
    const fetchNeighborhoods = async () => {
      const res = await regionAPI.getNeighborhoods(selectedDistrict.code);
      const items = (res.data.result || []).map((r) => ({
        id: r.cd,
        code: r.cd,
        name: r.emd_kor || r.emd_nm,
      }));
      setNeighborhoods(items);
      setSelectedNeighborhood(null);
    };
    fetchNeighborhoods();
  }, [selectedDistrict]);

  const handleFinalSelect = () => {
    let code = "";
    let fullAddress = "";

    if (selectedNeighborhood) {
      code = selectedNeighborhood.code;
      fullAddress = `${selectedProvince.name} ${selectedDistrict.name} ${selectedNeighborhood.name}`;
    } else if (selectedDistrict) {
      code = selectedDistrict.code;
      fullAddress = `${selectedProvince.name} ${selectedDistrict.name}`;
    } else if (selectedProvince) {
      code = selectedProvince.code;
      fullAddress = selectedProvince.name;
    }

    if (code && fullAddress) {
      // 부모가 expect 하는 shape: { code, fullAddress }
      onSelect({ code, fullAddress });
    }
  };

  return (
    <div className="region-selector">
      <label>지역 선택</label>
      <div className="region-dropdowns">
        <select
          value={selectedProvince?.id || ""}
          onChange={(e) =>
            setSelectedProvince(
              provinces.find((p) => p.id === e.target.value)
            )
          }
        >
          <option value="">시/도 선택</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          disabled={!selectedProvince}
          value={selectedDistrict?.id || ""}
          onChange={(e) =>
            setSelectedDistrict(
              districts.find((d) => d.id === e.target.value)
            )
          }
        >
          <option value="">시/군/구 선택</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          disabled={!selectedDistrict}
          value={selectedNeighborhood?.id || ""}
          onChange={(e) =>
            setSelectedNeighborhood(
              neighborhoods.find((n) => n.id === e.target.value)
            )
          }
        >
          <option value="">읍/면/동 선택</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-primary mt-2"
        type="button"
        onClick={handleFinalSelect}
      >
        주소 선택
      </button>
    </div>
  );
};

export default SingleRegionSelector;
