import { Logo } from './Logo';
import { TravelContain } from './TravelContain';

export const Header = () => {
  return (
    <>
      <div className="flex items-start justify-between mb-12">
        <Logo />
      </div>
      <TravelContain />
    </>
  );
};

