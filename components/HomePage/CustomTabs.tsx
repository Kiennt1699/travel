'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { ReactNode } from 'react';

interface TabLabelProps {
  icon: ReactNode;
  label: string;
  iconColor: string;
  iconBgColor: string;
  isActive?: boolean;
}

const TabLabel = ({ icon, label, iconColor, iconBgColor, isActive }: TabLabelProps) => {
  return (
    <div className="flex items-center gap-3 transition-all duration-300" style={{ justifyContent: 'flex-start' }}>
      <div
        className="flex items-center justify-center w-11 h-11 transition-all duration-300"
        style={{
          backgroundColor: iconBgColor,
          color: iconColor,
          borderRadius: '50%',
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isActive ? `0 4px 12px ${iconColor}40` : 'none',
        }}
      >
        {icon}
      </div>
      <span
        className="font-semibold transition-all duration-300"
        style={{
          fontSize: '15px',
          color: isActive ? '#1e293b' : '#64748b',
        }}
      >
        {label}
      </span>
    </div>
  );
};

interface CustomTabsProps extends Omit<TabsProps, 'className'> {
  activeTab: string;
  tabItems: TabsProps['items'];
  onTabChange: (key: string) => void;
}

export const CustomTabs = ({ activeTab, tabItems, onTabChange, ...props }: CustomTabsProps) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={onTabChange}
      items={tabItems}
      size="large"
      tabBarStyle={{
        borderBottom: 'none',
        marginBottom: '32px',
        width: '100%',
      }}
      tabBarGutter={0}
      style={{
        width: '100%',
      }}
      className="custom-tabs-wrapper"
      {...props}
    />
  );
};

export { TabLabel };
