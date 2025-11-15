import React from 'react';
import { colors } from '@/lib/theme';

export const TravelContain: React.FC = () => {
  return (
    <div className="text-center mb-12 max-w-3xl px-4">
      <h1 
        className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
        style={{ color: colors.text.primary }}
      >
        Travel Smarter, Not Harder
      </h1>
      <p 
        className="text-base md:text-lg leading-relaxed"
        style={{ color: colors.text.secondary }}
      >
        Make every trip effortless. Tripzy lets you book rides and plan journeys with ease.
      </p>
    </div>
  );
};

