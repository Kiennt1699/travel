import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { stylesConfig } from '@/lib/styles.config';
import { getDatePickerPrefix } from '@/lib/datepicker.config';
import {
  createDepartureDateValidator,
  createReturnDateValidator,
} from '@/utils/validators';
import { getDisabledTimeForToday, getDisabledTimeForReturnDate, getDisabledDateForReturn } from '@/utils/dateHelpers';
import type { FormInstance } from 'antd';

interface DatePickerFieldProps {
  name: string;
  label: string;
  form: FormInstance;
  disabled?: boolean;
  isReturnDate?: boolean;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  form,
  disabled = false,
  isReturnDate = false,
}) => {
  return (
    <Form.Item
      name={name}
      label={label ? <span style={stylesConfig.form.label}>{label}</span> : undefined}
      className={!label ? 'm-0' : undefined}
      style={{ marginBottom: 0 }}
      rules={isReturnDate ? [createReturnDateValidator(form)] : [createDepartureDateValidator()]}
    >
      <DatePicker
        showTime={{ format: 'HH:mm', minuteStep: 5 }}
        format="DD / MM / YYYY HH:mm"
        placeholder="DD / MM / YYYY   00:00"
        prefix={getDatePickerPrefix()}
        suffixIcon={null}
        disabled={disabled}
        size="large"
        style={{ height: '48px', fontSize: '15px', width: '100%' }}
        disabledDate={
          isReturnDate
            ? (current) => getDisabledDateForReturn(current, form)
            : (current) => current && current.isBefore(dayjs(), 'day')
        }
        disabledTime={
          isReturnDate
            ? (current) => getDisabledTimeForReturnDate(current, form)
            : getDisabledTimeForToday
        }
      />
    </Form.Item>
  );
};

