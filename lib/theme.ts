import type { ThemeConfig } from 'antd';

export const colors = {
  primary: '#0ea5e9', // sky-500
  primaryHover: '#0284c7', // sky-600
  success: '#10b981', // green-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444', // red-500
  text: {
    primary: '#1e293b', // slate-800
    secondary: '#64748b', // slate-500
    tertiary: '#94a3b8', // slate-400
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc', // slate-50
    tertiary: '#f0f9ff', // sky-50
    activeTab: '#e0f7fa', // cyan-50
    activeHotelTab: '#ecfccb', // lime-100
  },
  border: {
    default: '#e2e8f0', // slate-200
    focus: '#0ea5e9', // sky-500
  },
  tabs: {
    bus: {
      icon: '#06b6d4', // cyan-500
      iconBg: '#cffafe', // cyan-100
      activeBg: '#ecfeff', // cyan-50
    },
    hotel: {
      icon: '#84cc16', // lime-500
      iconBg: '#d9f99d', // lime-200
      activeBg: '#f7fee7', // lime-50
    },
    flight: {
      icon: '#6366f1', // indigo-500
      iconBg: '#c7d2fe', // indigo-200
      activeBg: '#eef2ff', // indigo-50
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

