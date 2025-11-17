import React from 'react';
import { Logo } from '@/components/HomePage/Logo';
import { SearchResults } from '@/components/SearchPage/SearchResults';

export default function SearchPage() {
  return (
    <div className="search-page-container">
      <div className="search-page-content">
        <div className="mb-8">
          <Logo />
        </div>
        <SearchResults />
      </div>
    </div>
  );
}
