import React from 'react';
import { Logo } from '@/components/HomePage/Logo';
import { SearchResults } from '@/components/SearchPage/SearchResults';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white relative p-4 md:p-8">
      <Logo />
      <SearchResults />
    </div>
  );
}
