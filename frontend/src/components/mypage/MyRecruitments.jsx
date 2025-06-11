"use client"

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '@/src/utils/storage';
import { recruitmentAPI } from '../../api';
import RecruitmentDetailModal from '../RecruitmentDetailModal';
import './MyRecruitments.css';

const MyRecruitments = () => {
  const user = getUserInfo();
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecruitment, setSelectedRecruitment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchRecruitments();
  }, [filter, sort]);

  const fetchRecruitments = async () => {
    try {
      setLoading(true);
      const response = await recruitmentAPI.getUserRecruitments(user.userId);

    
      // 필터링 및 정렬 적용
      let filteredData = [...response.data?.content];

      // 상태 필터링
      if (filter !== 'all') {
        filteredData = filteredData.filter((item) => item.status === filter);
      }

      // 정렬
      // filteredData.sort((a, b) => {
      //   if (sort === 'newest') {
      //     return new Date(b.createdAt) - new Date(a.createdAt);
      //   } else if (sort === 'oldest') {
      //     return new Date(a.createdAt) - new Date(b.createdAt);
      //   } else if (sort === 'deadline') {
      //     return new Date(a.deadline) - new Date(b.deadline);
      //   }
      //   return 1;
      // });

      setRecruitments(filteredData);
    } catch (error) {
      console.error('Error fetching recruitments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecruitmentClick = (recruitment) => {
    setSelectedRecruitment(recruitment);
    setShowModal(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleDeleteRecruitment = async (id, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    if (!window.confirm('정말로 이 모집 공고를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await recruitmentAPI.deleteRecruitment(id);
      fetchRecruitments(); // 목록 새로고침
      alert('모집 공고가 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting recruitment:', error);
      alert('모집 공고 삭제에 실패했습니다.');
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'RECRUITING':
        return '모집중';
      case 'COMPLETED':
        return '매칭완료';
      case 'CLOSED':
        return '마감됨';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="my-recruitments">
      <div className="section-header">
        <h2>작성한 모집 공고</h2>
        <div className="header-actions">
          <div className="filter-controls">
            <select value={filter} onChange={handleFilterChange} className="form-control">
              <option value="all">전체</option>
              <option value="RECRUITING">모집중</option>
              <option value="COMPLETED">매칭완료</option>
              <option value="CLOSED">마감됨</option>
            </select>

            <select value={sort} onChange={handleSortChange} className="form-control">
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="deadline">마감임박순</option>
            </select>
          </div>

          <Link to="/recruitment/create" className="btn btn-primary">
            새 모집 공고 작성
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : recruitments.length === 0 ? (
        <div className="no-recruitments">
          <p>작성한 모집 공고가 없습니다.</p>
          <Link to="/recruitment/create" className="btn btn-primary">
            첫 모집 공고 작성하기
          </Link>
        </div>
      ) : (
        <div className="recruitments-list">
          {recruitments.map((recruitment) => {
            const isIP = recruitment.profile.type === 'IP';
            const isExpired = new Date(recruitment.deadline) < new Date();

            return (
              <div
                key={recruitment.id}
                className={`recruitment-card ${isIP ? 'ip-recruitment' : 'store-recruitment'}`}
                onClick={() => handleRecruitmentClick(recruitment)}
              >
                <div className="recruitment-header">
                  <div className="profile-info">
                    <img
                      src={`http://localhost:8080/api/files/images/${recruitment.profile.imageUrl}`}
                      // src={recruitment.profile.imageUrl || '/placeholder-profile.png'}
                      alt={recruitment.profile.name}
                    />
                    <div>
                      <h3>{recruitment.profile.name}</h3>
                      <p>{isIP ? 'IP 캐릭터' : '매장'}</p>
                    </div>
                  </div>
                  <div className={`status-badge ${getStatusClass(recruitment.status)}`}>
                    {getStatusLabel(recruitment.status)}
                  </div>
                </div>

                <div className="recruitment-content">
                  <h2 className="recruitment-title">{recruitment.title}</h2>
                  <p className="recruitment-description">
                    {recruitment.description.length > 150
                      ? `${recruitment.description.substring(0, 150)}...`
                      : recruitment.description}
                  </p>
                </div>

                <div className="recruitment-footer">
                  <div className="recruitment-meta">
                    <span className="created-date">작성일: {new Date(recruitment.createdAt).toLocaleDateString()}</span>
                    <span className={`deadline ${isExpired ? 'expired' : ''}`}>
                      마감일: {new Date(recruitment.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="recruitment-actions">
                    <button
                      className="btn btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        // 수정 페이지로 이동
                        window.location.href = `/recruitment/edit/${recruitment.id}`;
                      }}
                    >
                      수정
                    </button>
                    <button className="btn btn-delete" onClick={(e) => handleDeleteRecruitment(recruitment.id, e)}>
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && selectedRecruitment && (
        <RecruitmentDetailModal
          recruitment={selectedRecruitment}
          onClose={() => setShowModal(false)}
          isOwner={true}
          onDelete={handleDeleteRecruitment}
        />
      )}
    </div>
  );
};

export default MyRecruitments;
