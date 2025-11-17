'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { SearchSkeleton } from '@/components/common/SearchSkeleton';

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
  
  const formatDisplayDate = (date: dayjs.Dayjs | null) => {
    if (!date) return 'Not selected';
    return date.format('MMMM DD, YYYY [at] HH:mm');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="search-info-row">
      <span className="search-info-label">{label}</span>
      <span className="search-info-value">{value}</span>
    </div>
  );

  return (
    <div className="search-results-container">
      <div className="search-results-card">
        <InfoRow label="From:" value={from || 'Not specified'} />
        <InfoRow label="To:" value={to || 'Not specified'} />
        <InfoRow label="Departure date:" value={formatDisplayDate(departureDate)} />
        <InfoRow 
          label="Return date:" 
          value={returnDate ? formatDisplayDate(returnDate) : 'One way trip'} 
        />
        <InfoRow label="Passengers:" value={pax} />
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

