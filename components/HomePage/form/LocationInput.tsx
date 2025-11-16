import { Form, AutoComplete, Input } from 'antd';
import { FaBusAlt } from 'react-icons/fa';
import { stylesConfig } from '@/lib/styles.config';
import { createLocationValidator } from '@/utils/validators';
import type { Location } from '@/app/page';

interface LocationInputProps {
  name: string;
  label: string;
  value: string;
  locations: Location[];
  filteredLocations: Location[];
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  name,
  label,
  value,
  locations,
  filteredLocations,
  onChange,
  onSelect,
}) => {
  const fieldName = label.toLowerCase() === 'from' ? 'origin' : 'destination';
  
  return (
    <Form.Item
      name={name}
      label={<span style={stylesConfig.form.label}>{label}</span>}
      rules={[createLocationValidator(fieldName)]}
      style={{ marginBottom: 0 }}
    >
      <AutoComplete
        options={filteredLocations.map((loc) => ({
          value: loc.english_name,
          label: (
            <div>
              <strong>{loc.short_code}</strong> - {loc.english_name} ({loc.code_state})
            </div>
          ),
        }))}
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        filterOption={(inputValue: string, option?: { value: string; label: React.ReactElement }) =>
          option?.value?.toLowerCase().includes(inputValue.toLowerCase()) ?? false
        }
      >
        <Input
          placeholder="Enter city, terminal..."
          prefix={<FaBusAlt style={stylesConfig.form.icon} />}
          size="large"
          allowClear
          style={{ height: '48px', fontSize: '15px' }}
        />
      </AutoComplete>
    </Form.Item>
  );
};

