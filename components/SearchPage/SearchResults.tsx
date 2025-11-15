'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Descriptions, Typography } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { colors } from '@/lib/theme';
import { SearchSkeleton } from '@/components/common/SearchSkeleton';

const { Title } = Typography;

function SearchContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const mode = searchParams.get('mode') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const dep = searchParams.get('dep') || '';
  const ret = searchParams.get('ret') || '';
  const pax = searchParams.get('pax') || '1';

  const departureDate = dep ? dayjs(dep) : null;
  const returnDate = ret ? dayjs(ret) : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-full max-w-2xl">
        <Title level={2} style={{ color: colors.text.primary, marginBottom: '2rem' }}>
          Search Results
        </Title>
        
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Mode">
            <CarOutlined style={{ marginRight: '8px' }} />
            {mode === 'bus' ? 'Bus & Shuttle' : mode}
          </Descriptions.Item>
          <Descriptions.Item label="From">
            {from || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="To">
            {to || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Departure Date">
            {departureDate ? departureDate.format('DD / MM / YYYY HH:mm') : 'N/A'}
          </Descriptions.Item>
          {returnDate && (
            <Descriptions.Item label="Return Date">
              {returnDate.format('DD / MM / YYYY HH:mm')}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Number of Passengers">
            {pax}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

export const SearchResults: React.FC = () => {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
};

