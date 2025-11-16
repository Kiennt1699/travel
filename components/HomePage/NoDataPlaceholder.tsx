import { colors } from '@/lib/theme';

export const NoDataPlaceholder = () => {
  return (
    <div className="flex justify-center items-center min-h-[300px] p-12">
      <p className="text-lg" style={{ color: colors.text.tertiary }}>
        No data
      </p>
    </div>
  );
};

