import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { colors } from '@/lib/theme';
import { stylesConfig } from '@/lib/styles.config';
import { createPassengerValidator } from '@/utils/validators';

export const PassengerInput: React.FC = () => {
  return (
    <Form.Item
      name="passengers"
      label={<span style={stylesConfig.form.label}>NO. OF PASSENGER</span>}
      rules={[createPassengerValidator()]}
      style={{ marginBottom: 0 }}
    >
      <Input
        type="number"
        min={1}
        max={9}
        prefix={<UserOutlined style={{ color: colors.text.tertiary }} />}
        placeholder="1"
        size="large"
        style={{ height: '48px', fontSize: '15px', width: '100%' }}
      />
    </Form.Item>
  );
};

