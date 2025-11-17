'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { FaBusAlt } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { RiFlightTakeoffFill } from "react-icons/ri";

import type { Dayjs } from 'dayjs';
import { Header } from '@/components/HomePage/Header';
import { BusSearchForm } from '@/components/HomePage/BusSearchForm';
import { NoDataPlaceholder } from '@/components/HomePage/NoDataPlaceholder';
import { CustomTabs, TabLabel } from '@/components/HomePage/CustomTabs';
import locationsData from './data/location.json';
import { colors } from '@/lib/theme';

export type Location = {
  short_code: string;
  english_name: string;
  code_state: string;
};

export type FormValues = {
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
      params.set('dep', values.departureDate.format('YYYY-MM-DD HH:mm'));
      params.set('pax', values.passengers.toString());

      if (values.roundTrip && values.returnDate) {
        params.set('ret', values.returnDate.format('YYYY-MM-DD HH:mm'));
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
          icon={<FaBusAlt style={{ fontSize: '24px' }} />}
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
          icon={<IoIosBusiness style={{ fontSize: '28px', fontWeight: 'bold', color: '#447a11' }} />}
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
          icon={<RiFlightTakeoffFill style={{ fontSize: '28px' }} />}
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
        <Header />

        <div 
          className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl w-full animate-scale-in"
          style={{
            borderTop: `4px solid ${colors.primary}`,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.05)',
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
  );
}
