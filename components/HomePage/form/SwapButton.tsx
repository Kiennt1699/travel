import { Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { stylesConfig } from '@/lib/styles.config';

interface SwapButtonProps {
  onClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <div className="hidden lg:flex items-center justify-center" style={{ marginTop: '42px' }}>
      <Button
        type="text"
        icon={<SwapOutlined style={{ fontSize: '18px' }} />}
        onClick={onClick}
        style={stylesConfig.swapButton}
        className="hover:rotate-180 transition-transform duration-300"
      />
    </div>
  );
};

