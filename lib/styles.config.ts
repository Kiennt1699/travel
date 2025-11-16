import { colors } from './theme';

export const stylesConfig = {
  tabs: {
    container: {
      width: '100%',
      display: 'flex',
      borderBottom: 'none',
    },
    tab: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '18px 24px',
      margin: 0,
      borderRadius: 0,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    tabActive: {
      bus: {
        backgroundColor: colors.tabs.bus.activeBg,
      },
      hotel: {
        backgroundColor: colors.tabs.hotel.activeBg,
      },
      flight: {
        backgroundColor: colors.tabs.flight.activeBg,
      },
    },
  },
  form: {
    grid: {
      gap: '20px',
      marginBottom: '24px',
    },
    label: {
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      fontSize: '12px',
      color: colors.text.secondary,
      marginBottom: '10px',
      display: 'block',
    },
    icon: {
      color: colors.text.tertiary,
      fontSize: '18px',
    },
  },
  swapButton: {
    color: colors.tabs.bus.icon,
    backgroundColor: 'white',
    border: `2px solid ${colors.border.default}`,
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.15)',
  },
  searchButton: {
    backgroundColor: colors.tabs.bus.icon,
    borderColor: colors.tabs.bus.icon,
    height: '56px',
    paddingLeft: '64px',
    paddingRight: '64px',
    borderRadius: '28px',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
  },
};

