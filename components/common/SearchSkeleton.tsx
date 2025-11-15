import React from 'react';
import { Card, Skeleton } from 'antd';

export const SearchSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-4">
      <Card className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-full max-w-2xl">
        <Skeleton active paragraph={{ rows: 0 }} />
        <div className="mt-6 space-y-4">
          <Skeleton.Input active size="large" className="w-full" />
          <Skeleton.Input active size="large" className="w-full" />
          <Skeleton.Input active size="large" className="w-full" />
          <Skeleton.Input active size="large" className="w-full" />
          <Skeleton.Input active size="large" className="w-full" />
          <Skeleton.Input active size="large" className="w-full" />
        </div>
      </Card>
    </div>
  );
};

