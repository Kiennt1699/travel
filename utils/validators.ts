import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd';

export const createLocationValidator = (fieldName: string, form: FormInstance, currentField: 'from' | 'to') => ({
  validator: (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(`Please select your ${fieldName}`);
    }
    
    const otherField = currentField === 'from' ? 'to' : 'from';
    const otherValue = form.getFieldValue(otherField);
    
    if (otherValue && value && value.toLowerCase() === otherValue.toLowerCase()) {
      return Promise.reject('Origin and destination cannot be the same location');
    }
    
    return Promise.resolve();
  },
});

export const createDepartureDateValidator = () => ({
  validator: (_: unknown, value: Dayjs) => {
    if (!value) return Promise.reject('Please select departure date');
    const now = dayjs();
    if (value.isBefore(now) || value.isSame(now)) {
      return Promise.reject('Departure date and time must be greater than current date and time');
    }
    return Promise.resolve();
  },
});

export const createReturnDateValidator = (form: FormInstance) => ({
  validator: (_: unknown, value: Dayjs) => {
    const roundTripValue = form.getFieldValue('roundTrip');
    if (roundTripValue && !value) {
      return Promise.reject('Please select return date');
    }
    if (roundTripValue && value) {
      const now = dayjs();
      if (value.isBefore(now) || value.isSame(now)) {
        return Promise.reject('Return date and time must be greater than current date and time');
      }
      const departureDate = form.getFieldValue('departureDate');
      if (departureDate && (value.isBefore(departureDate) || value.isSame(departureDate))) {
        return Promise.reject('Return date and time must be after departure date and time');
      }
    }
    return Promise.resolve();
  },
});

export const createPassengerValidator = () => ({
  validator: (_: unknown, value: number) => {
    const numValue = Number(value);
    if (!value || isNaN(numValue)) {
      return Promise.reject('Please enter a valid number');
    }
    if (numValue < 1) {
      return Promise.reject('At least 1 passenger required');
    }
    if (numValue > 9) {
      return Promise.reject('Maximum 9 passengers');
    }
    return Promise.resolve();
  },
});

