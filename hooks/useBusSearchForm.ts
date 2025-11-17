import { useState, useCallback } from 'react';
import { Form } from 'antd';
import type { Dayjs } from 'dayjs';
import type { FormValues, Location } from '@/app/page';

export const useBusSearchForm = (locations: Location[]) => {
  const [form] = Form.useForm();
  const [roundTrip, setRoundTrip] = useState(false);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const filterLocations = useCallback((input: string): Location[] => {
    if (!input) return locations;
    const lowerInput = input.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.english_name.toLowerCase().includes(lowerInput) ||
        loc.short_code.toLowerCase().includes(lowerInput) ||
        loc.code_state.toLowerCase().includes(lowerInput)
    );
  }, [locations]);

  const handleSwap = useCallback(() => {
    const currentFrom = form.getFieldValue('from') || '';
    const currentTo = form.getFieldValue('to') || '';
    form.setFieldsValue({ from: currentTo, to: currentFrom });
    setFromValue(currentTo);
    setToValue(currentFrom);
  }, [form]);

  const handleLocationChange = useCallback((value: string, field: 'from' | 'to') => {
    if (field === 'from') {
      setFromValue(value);
    } else {
      setToValue(value);
    }
  }, []);

  const handleFormValuesChange = useCallback((changedValues: Partial<FormValues>) => {
    if ('from' in changedValues) {
      setFromValue(changedValues.from || '');
    }
    if ('to' in changedValues) {
      setToValue(changedValues.to || '');
    }
  }, []);

  return {
    form,
    roundTrip,
    setRoundTrip,
    fromValue,
    toValue,
    filterLocations,
    handleSwap,
    handleLocationChange,
    handleFormValuesChange,
  };
};

