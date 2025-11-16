'use client';

import { Form, Checkbox, Button } from 'antd';
import { IoSearch } from 'react-icons/io5';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useBusSearchForm } from '@/hooks/useBusSearchForm';
import { LocationInput } from './form/LocationInput';
import { DatePickerField } from './form/DatePickerField';
import { SwapButton } from './form/SwapButton';
import { PassengerInput } from './form/PassengerInput';
import { colors } from '@/lib/theme';
import { stylesConfig } from '@/lib/styles.config';
import type { Location, FormValues } from '@/app/page';

interface BusSearchFormProps {
  locations: Location[];
  onSubmit: (values: FormValues) => void;
}

export const BusSearchForm: React.FC<BusSearchFormProps> = ({ locations, onSubmit }) => {
  const {
    form,
    roundTrip,
    setRoundTrip,
    fromValue,
    toValue,
    filterLocations,
    handleSwap,
    handleLocationChange,
  } = useBusSearchForm(locations);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ passengers: 1, roundTrip: false }}
      onFinish={onSubmit}
      className="animate-slide-up"
    >
      <div className="flex flex-col lg:flex-row gap-4 mt-6 items-start relative">
        <div className="w-full lg:w-auto lg:flex-1 lg:max-w-[210px]">
          <LocationInput
            name="from"
            label="FROM"
            value={fromValue}
            locations={locations}
            filteredLocations={filterLocations(fromValue)}
            onChange={(value) => handleLocationChange(value, 'from')}
            onSelect={(value) => handleLocationChange(value, 'from')}
          />
        </div>

        <SwapButton onClick={handleSwap} />

        <div className="w-full lg:flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <LocationInput
            name="to"
            label="TO"
            value={toValue}
            locations={locations}
            filteredLocations={filterLocations(toValue)}
            onChange={(value) => handleLocationChange(value, 'to')}
            onSelect={(value) => handleLocationChange(value, 'to')}
          />

          <DatePickerField
            name="departureDate"
            label="DEPARTURE DATE"
            form={form}
            isReturnDate={false}
          />

          <div className="flex flex-col">
            <div className="mb-[8px]">
              <Form.Item name="roundTrip" valuePropName="checked" className="m-0">
                <Checkbox
                  onChange={(e: CheckboxChangeEvent) => setRoundTrip(e.target.checked)}
                  style={{ fontSize: '12px', fontWeight: 600 }}
                >
                  <span
                    style={{
                      textTransform: 'uppercase',
                      color: colors.text.secondary,
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    ROUND TRIP?
                  </span>
                </Checkbox>
              </Form.Item>
            </div>
            <DatePickerField
              name="returnDate"
              label=""
              form={form}
              disabled={!roundTrip}
              isReturnDate={true}
            />
          </div>

          <PassengerInput />
        </div>
      </div>

      <Form.Item className="flex justify-center">
        <Button
          className="mt-10"
          type="primary"
          icon={<IoSearch style={{ fontSize: '18px' }} />}
          htmlType="submit"
          size="large"
          style={stylesConfig.searchButton}
        >
          SEARCH
        </Button>
      </Form.Item>
    </Form>
  );
};
