import dayjs, { type Dayjs } from 'dayjs';
import type { FormInstance } from 'antd';

export const getDisabledTimeForToday = (current: Dayjs | null) => {
  if (!current) return {};
  const now = dayjs();
  if (current.isSame(now, 'day')) {
    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i <= now.hour(); i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (selectedHour === now.hour()) {
          const minutes = [];
          for (let i = 0; i <= now.minute(); i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      },
    };
  }
  return {};
};

export const getDisabledTimeForReturnDate = (current: Dayjs | null, form: FormInstance) => {
  if (!current) return {};
  const now = dayjs();
  const departureDate = form.getFieldValue('departureDate') as Dayjs | undefined;

  if (current.isSame(now, 'day')) {
    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i <= now.hour(); i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (selectedHour === now.hour()) {
          const minutes = [];
          for (let i = 0; i <= now.minute(); i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      },
    };
  }

  if (departureDate && current.isSame(departureDate, 'day')) {
    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i <= departureDate.hour(); i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (selectedHour === departureDate.hour()) {
          const minutes = [];
          for (let i = 0; i <= departureDate.minute(); i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      },
    };
  }

  return {};
};

export const getDisabledDateForReturn = (current: Dayjs | null, form: FormInstance) => {
  if (!current) return false;
  const now = dayjs();
  const departureDate = form.getFieldValue('departureDate') as Dayjs | undefined;
  if (current.isBefore(now, 'day')) return true;
  if (departureDate && current.isBefore(departureDate, 'day')) return true;
  return false;
};

