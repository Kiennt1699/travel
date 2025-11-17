import { Logo } from './Logo';
import { TravelContain } from './TravelContain';

export const Header = () => {
  return (
    <>
      <div className="mb-8">
        <Logo />
      </div>
      <div className="flex justify-center">
        <TravelContain />
      </div>
    </>
  );
};

