import React from 'react';
import { Skeleton } from 'antd';

export const SearchSkeleton: React.FC = () => {
  const SkeletonRow = () => (
    <div className="search-info-row">
      <Skeleton.Input 
        active 
        size="small" 
        style={{ width: 150, height: 24, borderRadius: 4 }} 
      />
      <Skeleton.Input 
        active 
        size="small" 
        style={{ width: '60%', minWidth: 200, height: 24, borderRadius: 4 }} 
      />
    </div>
  );

  return (
    <div className="search-results-container">
      <div className="search-results-card">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </div>
  );
};

