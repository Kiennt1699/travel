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
    <div className="flex items-center gap-3" style={{ justifyContent: 'flex-start' }}>
      <div 
        className="flex items-center justify-center w-10 h-10 transition-all"
        style={{ 
          backgroundColor: iconBgColor,
          color: iconColor,
          borderRadius: '50%',
        }}
      >
        {icon}
      </div>
      <span className="font-medium" style={{ fontSize: '15px' }}>{label}</span>
    </div>
  );
};

