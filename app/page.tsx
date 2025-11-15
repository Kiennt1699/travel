'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, message } from 'antd';
import { CarOutlined, HomeOutlined, AimOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { Logo } from '@/components/HomePage/Logo';
import { TravelContain } from '@/components/HomePage/TravelContain';
import { BusSearchForm } from '@/components/HomePage/BusSearchForm';
import { NoDataPlaceholder } from '@/components/HomePage/NoDataPlaceholder';
import { TabLabel } from '@/components/HomePage/TabLabel';
import { CustomTabs } from '@/components/HomePage/CustomTabs';
import locationsData from './data/location.json';
import { colors } from '@/lib/theme';
import { stylesConfig } from '@/lib/styles.config';

type Location = {
  short_code: string;
  english_name: string;
  code_state: string;
};

type FormValues = {
  from: string;
  to: string;
  departureDate: Dayjs;
  returnDate?: Dayjs;
  roundTrip: boolean;
  passengers: number;
};

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bus');

  const locations: Location[] = locationsData as Location[];

  const handleSearch = (values: FormValues) => {
    try {
      const params = new URLSearchParams();
      params.set('mode', 'bus');
      params.set('from', values.from);
      params.set('to', values.to);
      params.set('dep', values.departureDate.format('YYYY-MM-DD'));
      params.set('pax', values.passengers.toString());

      if (values.roundTrip && values.returnDate) {
        params.set('ret', values.returnDate.format('YYYY-MM-DD'));
      }

      router.push(`/search?${params.toString()}`);
    } catch (error) {
      message.error('Please fill in all required fields correctly');
    }
  };

  const tabItems = [
    {
      key: 'bus',
      label: (
        <TabLabel
          icon={<CarOutlined style={{ fontSize: '18px' }} />}
          label="Bus & Shuttle"
          iconColor={colors.tabs.bus.icon}
          iconBgColor={colors.tabs.bus.iconBg}
          isActive={activeTab === 'bus'}
        />
      ),
      children: <BusSearchForm locations={locations} onSubmit={handleSearch} />,
    },
    {
      key: 'hotel',
      label: (
        <TabLabel
          icon={<HomeOutlined style={{ fontSize: '18px' }} />}
          label="Hotel & Accommodation"
          iconColor={colors.tabs.hotel.icon}
          iconBgColor={colors.tabs.hotel.iconBg}
          isActive={activeTab === 'hotel'}
        />
      ),
      children: <NoDataPlaceholder />,
    },
    {
      key: 'flight',
      label: (
        <TabLabel
          icon={<AimOutlined style={{ fontSize: '18px' }} />}
          label="Flight"
          iconColor={colors.tabs.flight.icon}
          iconBgColor={colors.tabs.flight.iconBg}
          isActive={activeTab === 'flight'}
        />
      ),
      children: <NoDataPlaceholder />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white relative px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <Logo />
        </div>

        <div className="flex flex-col items-center">
          <TravelContain />

          <div 
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-full"
            style={{
              borderTop: `4px solid ${colors.primary}`,
            }}
          >
            <CustomTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabItems={tabItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
