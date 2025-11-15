'use client';

import React from 'react';
import { Form, AutoComplete, Input, DatePicker, InputNumber, Checkbox, Button } from 'antd';
import { SwapOutlined, SearchOutlined, CarOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { colors } from '@/lib/theme';
import { stylesConfig } from '@/lib/styles.config';

type Location = {
  short_code: string;
  english_name: string;
  code_state: string;
};

type FormValues = {
  from: string;
  to: string;
  departureDate: Dayjs;
  returnDate?: Dayjs;
  roundTrip: boolean;
  passengers: number;
};

interface BusSearchFormProps {
  locations: Location[];
  onSubmit: (values: FormValues) => void;
}

export const BusSearchForm: React.FC<BusSearchFormProps> = ({ locations, onSubmit }) => {
  const [form] = Form.useForm();
  const [roundTrip, setRoundTrip] = React.useState(false);
  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');

  const filterLocations = (input: string): Location[] => {
    if (!input) return locations;
    const lowerInput = input.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.english_name.toLowerCase().includes(lowerInput) ||
        loc.short_code.toLowerCase().includes(lowerInput) ||
        loc.code_state.toLowerCase().includes(lowerInput)
    );
  };

  const handleSwap = () => {
    const currentFrom = form.getFieldValue('from');
    const currentTo = form.getFieldValue('to');
    form.setFieldsValue({ from: currentTo, to: currentFrom });
    setFromValue(currentTo || '');
    setToValue(currentFrom || '');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ passengers: 1, roundTrip: false }}
      onFinish={onSubmit}
    >
      <div 
        className="grid grid-cols-1 lg:grid-cols-5"
        style={stylesConfig.form.grid}
      >
        <div className="relative">
          <Form.Item
            name="from"
            label={<span style={stylesConfig.form.label}>FROM</span>}
            rules={[{ required: true, message: 'Please select origin' }]}
          >
            <AutoComplete
              placeholder="Enter city, terminal..."
              options={filterLocations(fromValue).map((loc) => ({
                value: loc.english_name,
                label: (
                  <div>
                    <strong>{loc.short_code}</strong> - {loc.english_name} ({loc.code_state})
                  </div>
                ),
              }))}
              value={fromValue}
              onChange={(value: string) => {
                setFromValue(value);
                form.setFieldValue('from', value);
              }}
              onSelect={(value: string) => {
                setFromValue(value);
                form.setFieldValue('from', value);
              }}
              filterOption={(inputValue: string, option: { value: string }) =>
                option?.value?.toLowerCase().includes(inputValue.toLowerCase()) ?? false
              }
            >
              <Input 
                prefix={<CarOutlined style={stylesConfig.form.icon} />}
                style={stylesConfig.form.input}
                placeholder="Enter city, terminal..."
              />
            </AutoComplete>
          </Form.Item>
          
          <div className="hidden lg:block absolute -right-5 top-[38px] z-10">
            <Button
              type="text"
              icon={<SwapOutlined style={{ fontSize: '18px' }} />}
              onClick={handleSwap}
              style={stylesConfig.swapButton}
            />
          </div>
        </div>

        <Form.Item
          name="to"
          label={<span style={stylesConfig.form.label}>TO</span>}
          rules={[{ required: true, message: 'Please select destination' }]}
        >
          <AutoComplete
            placeholder="Enter city, terminal..."
            options={filterLocations(toValue).map((loc) => ({
              value: loc.english_name,
              label: (
                <div>
                  <strong>{loc.short_code}</strong> - {loc.english_name} ({loc.code_state})
                </div>
              ),
            }))}
            value={toValue}
            onChange={(value: string) => {
              setToValue(value);
              form.setFieldValue('to', value);
            }}
            onSelect={(value: string) => {
              setToValue(value);
              form.setFieldValue('to', value);
            }}
            filterOption={(inputValue: string, option: { value: string }) =>
              option?.value?.toLowerCase().includes(inputValue.toLowerCase()) ?? false
            }
          >
            <Input 
              prefix={<CarOutlined style={stylesConfig.form.icon} />}
              style={stylesConfig.form.input}
              placeholder="Enter city, terminal..."
            />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="departureDate"
          label={<span style={stylesConfig.form.label}>DEPARTURE DATE</span>}
          rules={[
            { required: true, message: 'Please select departure date' },
            {
              validator: (_, value) => {
                if (!value) return Promise.reject('Please select departure date');
                if (value.isBefore(dayjs(), 'day')) {
                  return Promise.reject('Departure date cannot be in the past');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            showTime
            format="DD / MM / YYYY HH:mm"
            placeholder="DD / MM / YYYY 00:00"
            className="w-full"
            suffixIcon={null}
            style={stylesConfig.form.input}
          />
        </Form.Item>

        <div className="flex flex-col">
          <Form.Item 
            name="roundTrip" 
            valuePropName="checked" 
            className="m-0 mb-2"
          >
            <Checkbox 
              onChange={(e: CheckboxChangeEvent) => setRoundTrip(e.target.checked)}
              style={{ fontSize: '12px', fontWeight: 600 }}
            >
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.text.secondary }}>ROUND TRIP?</span>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="returnDate"
            className="m-0"
            rules={[
              {
                validator: (_, value) => {
                  const roundTripValue = form.getFieldValue('roundTrip');
                  if (roundTripValue && !value) {
                    return Promise.reject('Please select return date');
                  }
                  if (roundTripValue && value) {
                    const departureDate = form.getFieldValue('departureDate');
                    if (departureDate && value.isBefore(departureDate, 'day')) {
                      return Promise.reject('Return date must be after departure date');
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              showTime
              format="DD / MM / YYYY HH:mm"
              placeholder="DD / MM / YYYY 00:00"
              disabled={!roundTrip}
              className="w-full"
              suffixIcon={null}
              style={stylesConfig.form.input}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="passengers"
          label={<span style={stylesConfig.form.label}>NO. OF PASSENGER</span>}
          rules={[
            { required: true, message: 'Please select number of passengers' },
            { type: 'number', min: 1, message: 'At least 1 passenger required' },
          ]}
        >
          <InputNumber
            min={1}
            max={99}
            className="w-full"
            controls={{
              upIcon: <span>▲</span>,
              downIcon: <span>▼</span>,
            }}
            style={stylesConfig.form.input}
            placeholder="1"
          />
        </Form.Item>
      </div>

      <Form.Item className="flex justify-center mt-8 mb-0">
        <Button
          type="primary"
          icon={<SearchOutlined />}
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

