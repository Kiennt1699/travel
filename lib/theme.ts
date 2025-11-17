import type { ThemeConfig } from 'antd';

export const colors = {
  primary: '#19C0FF',
  primaryHover: '#0284c7',
  success: '#10b981', 
  warning: '#f59e0b', 
  error: '#ef4444', 
  text: {
    primary: '#1e293b',
    secondary: '#64748b', 
    tertiary: '#94a3b8', 
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc', 
    tertiary: '#f0f9ff', 
    activeTab: '#e0f7fa', 
    activeHotelTab: '#ecfccb', 
  },
  border: {
    default: '#e2e8f0', 
    focus: '#0ea5e9',
  },
  tabs: {
    bus: {
      icon: '#19C0FF', 
      iconBg: '#cffafe', 
      activeBg: '#ecfeff', 
    },
    hotel: {
      icon: '#84cc16',
      iconBg: '#d9f99d', 
      activeBg: '#f7fee7', 
    },
    flight: {
      icon: '#6366f1', 
      iconBg: '#c7d2fe',
      activeBg: '#eef2ff', 
    },
  },
};

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorText: colors.text.primary,
    colorTextSecondary: colors.text.secondary,
    colorTextTertiary: colors.text.tertiary,
    colorBorder: colors.border.default,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      controlHeight: 40,
      controlHeightLG: 48,
      fontWeight: 600,
      primaryShadow: 'none',
    },
    Input: {
      controlHeight: 48,
      paddingBlock: 12,
      paddingInline: 16,
    },
    Select: {
      controlHeight: 44,
    },
    DatePicker: {
      controlHeight: 48,
    },
    InputNumber: {
      controlHeight: 48,
      paddingBlock: 12,
      paddingInline: 16,
      handleVisible: true,
    },
    Form: {
      labelFontSize: 12,
      labelColor: colors.text.primary,
      labelRequiredMarkColor: colors.error,
    },
    Tabs: {
      titleFontSize: 16,
      cardPadding: '16px 32px',
    },
  },
};

