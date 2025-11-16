'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { SearchSkeleton } from '@/components/common/SearchSkeleton';
import { stylesConfig } from '@/lib/styles.config';

function SearchContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const dep = searchParams.get('dep') || '';
  const ret = searchParams.get('ret') || '';
  const pax = searchParams.get('pax') || '1';

  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const parsed = dayjs(dateStr, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD'], true);
    return parsed.isValid() ? parsed : null;
  };

  const departureDate = parseDate(dep);
  const returnDate = parseDate(ret);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  const InfoRow = ({ label }: { label: string }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      paddingTop: '24px',
      paddingBottom: '24px',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <span style={{
        fontSize: '16px',
        fontWeight: 400,
        color: '#1f2937',
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e0f2fe',
      padding: '0',
    }}>

      {/* Content */}
      <div style={{
        backgroundColor: '#e0f2fe',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        }}>
          <InfoRow label={`From: ${from}`} />
          <InfoRow label="To:" />
          <InfoRow label="Departure date:" />
          <InfoRow label="Return date:" />
          <InfoRow label="No. of passenger" />
        </div>
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

