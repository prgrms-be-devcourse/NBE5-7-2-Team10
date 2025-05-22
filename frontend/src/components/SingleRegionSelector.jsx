"use client";

import { useEffect, useState } from "react";
import { regionAPI } from "../api";
import "./RegionSelector.css";

const SingleRegionSelector = ({ initialCode, onSelect }) => {
  const [provinces, setProvinces]         = useState([]);
  const [districts, setDistricts]         = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const [selProvince, setSelProvince]       = useState(null);
  const [selDistrict, setSelDistrict]       = useState(null);
  const [selNeighborhood, setSelNeighborhood] = useState(null);

  // 1) 시/도
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await regionAPI.getAddress();       // cd 없이 호출 → 시/도
      setProvinces(res.data.result || []);
    };
    fetchProvinces();
  }, []);

  // 2) 시/군/구
  useEffect(() => {
    if (!selProvince) return;
    const fetchDistricts = async () => {
      const res = await regionAPI.getAddress(selProvince.cd);
      setDistricts(res.data.result || []);
      setSelDistrict(null);
      setNeighborhoods([]);
    };
    fetchDistricts();
  }, [selProvince]);

  // 3) 읍/면/동
  useEffect(() => {
    if (!selDistrict) return;
    const fetchNeighborhoods = async () => {
      const res = await regionAPI.getAddress(selDistrict.cd);
      setNeighborhoods(res.data.result || []);
      setSelNeighborhood(null);
    };
    fetchNeighborhoods();
  }, [selDistrict]);

  const handleFinalSelect = () => {
    let code = "";
    let fullAddress = "";

    if (selNeighborhood) {
      code = selNeighborhood.cd;
      fullAddress = `${selProvince.addr_name} ${selDistrict.addr_name} ${selNeighborhood.addr_name}`;
    } else if (selDistrict) {
      code = selDistrict.cd;
      fullAddress = `${selProvince.addr_name} ${selDistrict.addr_name}`;
    } else if (selProvince) {
      code = selProvince.cd;
      fullAddress = selProvince.addr_name;
    }

    if (code) onSelect({ code, fullAddress });
  };

  return (
    <div className="region-selector">
      <label>지역 선택</label>
      <div className="region-dropdowns">
        <select
          value={selProvince?.cd || ""}
          onChange={e =>
            setSelProvince(
              provinces.find(p => p.cd === e.target.value) || null
            )
          }
        >
          <option value="">시/도 선택</option>
          {provinces.map(p => (
            <option key={p.cd} value={p.cd}>
              {p.addr_name}
            </option>
          ))}
        </select>

        <select
          disabled={!selProvince}
          value={selDistrict?.cd || ""}
          onChange={e =>
            setSelDistrict(
              districts.find(d => d.cd === e.target.value) || null
            )
          }
        >
          <option value="">시/군/구 선택</option>
          {districts.map(d => (
            <option key={d.cd} value={d.cd}>
              {d.addr_name}
            </option>
          ))}
        </select>

        <select
          disabled={!selDistrict}
          value={selNeighborhood?.cd || ""}
          onChange={e =>
            setSelNeighborhood(
              neighborhoods.find(n => n.cd === e.target.value) || null
            )
          }
        >
          <option value="">읍/면/동 선택</option>
          {neighborhoods.map(n => (
            <option key={n.cd} value={n.cd}>
              {n.addr_name}
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
