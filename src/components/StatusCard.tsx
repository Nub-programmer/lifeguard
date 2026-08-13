import React from 'react';

interface StatusCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  badge?: string;
  badgeColor?: 'green' | 'yellow' | 'red' | 'cyan';
  icon?: React.ReactNode;
  trend?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  subValue,
  badge,
  badgeColor = 'green',
  icon,
  trend
}) => {
  const badgeStyles = {
    green: 'bg-[#b8ff3d]/15 text-[#b8ff3d] border-[#b8ff3d]/40',
    yellow: 'bg-[#ffd54a]/15 text-[#ffd54a] border-[#ffd54a]/40',
    red: 'bg-[#ff6464]/15 text-[#ff6464] border-[#ff6464]/40',
    cyan: 'bg-[#5ce1e6]/15 text-[#5ce1e6] border-[#5ce1e6]/40',
  };

  return (
    <div className="bg-[#121814] border border-[#222e26] hover:border-[#2d3f33] rounded-xl p-4 font-mono shadow-lg relative overflow-hidden transition">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#8a9d90] font-bold tracking-wider flex items-center space-x-1.5">
          {icon && <span className="text-[#b8ff3d]">{icon}</span>}
          <span>{label}</span>
        </span>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-2xl sm:text-3xl font-black text-[#f2f5ef] tracking-tight">
          {value}
        </span>
        {subValue && <span className="text-xs text-[#8a9d90]">{subValue}</span>}
      </div>

      {trend && (
        <div className="mt-2 text-[11px] text-[#627568] flex items-center justify-between border-t border-[#1a251e] pt-1.5">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
