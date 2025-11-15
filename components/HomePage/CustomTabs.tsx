'use client';

import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface CustomTabsProps extends Omit<TabsProps, 'className'> {
  activeTab: string;
  tabItems: TabsProps['items'];
  onTabChange: (key: string) => void;
}

export const CustomTabs: React.FC<CustomTabsProps> = ({
  activeTab,
  tabItems,
  onTabChange,
  ...props
}) => {
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
    />
  );
};
