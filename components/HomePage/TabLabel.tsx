import React from 'react';

interface TabLabelProps {
  icon: React.ReactNode;
  label: string;
  iconColor: string;
  iconBgColor: string;
  isActive?: boolean;
}

export const TabLabel: React.FC<TabLabelProps> = ({ 
  icon, 
  label, 
  iconColor, 
  iconBgColor,
  isActive 
}) => {
  return (
    <div 
      className="flex items-center gap-3 transition-all duration-300" 
      style={{ justifyContent: 'center' }}
    >
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

