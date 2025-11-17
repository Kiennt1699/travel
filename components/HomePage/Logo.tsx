import { colors } from '@/lib/theme';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-semibold" style={{ color: colors.primary }}>
      <span className="text-3xl">❄</span>
      <span>Tripzy</span>
    </div>
  );
};

