import { LabelValuePair } from '@DataTypes/pair';

export const PROVIDER_OPTIONS: LabelValuePair[] = [
  {
    label: 'AWS',
    value: 'AWS',
  },
  {
    label: 'AZURE',
    value: 'AZURE',
    disabled: true,
  },
  {
    label: 'GCP',
    value: 'GCP',
    disabled: true,
  },
];

export const AWS_CREDENTIAL_TYPE_OPTIONS: LabelValuePair[] = [
  {
    label: 'ACCESS KEY',
    value: 'ACCESS_KEY',
  },
  {
    label: 'ASSUME ROLE',
    value: 'ASSUME_ROLE',
  },
  {
    label: 'ROLES ANYWHERE',
    value: 'ROLES_ANYWHERE',
  },
];

export const AWS_REGION_OPTIONS: LabelValuePair[] = [
  {
    label: 'global',
    value: 'global',
  },
  {
    label: 'ap-northeast-1',
    value: 'ap-northeast-1',
  },
  {
    label: 'ap-northeast-2',
    value: 'ap-northeast-2',
  },
  {
    label: 'ap-northeast-3',
    value: 'ap-northeast-3',
  },
  {
    label: 'ap-south-1',
    value: 'ap-south-1',
  },
  {
    label: 'ap-southeast-1',
    value: 'ap-southeast-1',
  },
  {
    label: 'ap-southeast-2',
    value: 'ap-southeast-2',
  },
  {
    label: 'ca-central-1',
    value: 'ca-central-1',
  },
  {
    label: 'eu-central-1',
    value: 'eu-central-1',
  },
  {
    label: 'eu-north-1',
    value: 'eu-north-1',
  },
  {
    label: 'eu-west-1',
    value: 'eu-west-1',
  },
  {
    label: 'eu-west-2',
    value: 'eu-west-2',
  },
  {
    label: 'eu-west-3',
    value: 'eu-west-3',
  },
  {
    label: 'sa-east-1',
    value: 'sa-east-1',
  },
  {
    label: 'us-east-1',
    value: 'us-east-1',
  },
  {
    label: 'us-east-2',
    value: 'us-east-2',
  },
  {
    label: 'us-west-1',
    value: 'us-west-1',
  },
  {
    label: 'us-west-2',
    value: 'us-west-2',
  },
];

export const SCHEDULE_FREQUENCY_OPTIONS: LabelValuePair[] = [
  {
    label: 'HOUR',
    value: 'HOUR',
  },
  {
    label: 'DAY',
    value: 'DAY',
  },
  {
    label: 'WEEK',
    value: 'WEEK',
  },
  {
    label: 'MONTH',
    value: 'MONTH',
  },
];

export const SCHEDULE_DATE_OPTIONS: LabelValuePair[] = Array.from({ length: 29 }, (_, i) => ({
  label: `${i}`,
  value: i.toString(),
}));

export const SCHEDULE_WEEKDAY_OPTIONS: LabelValuePair[] = [
  {
    label: 'Monday',
    value: 'MON',
  },
  {
    label: 'Tuesday',
    value: 'TUE',
  },
  {
    label: 'Wednesday',
    value: 'WED',
  },
  {
    label: 'Thursday',
    value: 'THU',
  },
  {
    label: 'Friday',
    value: 'FRI',
  },
  {
    label: 'Saturday',
    value: 'SAT',
  },
  {
    label: 'Sunday',
    value: 'SUN',
  },
];

export const SCHEDULE_HOUR_OPTIONS: LabelValuePair[] = Array.from({ length: 24 }, (_, i) => ({
  label: `${i.toString().padStart(2, '0')}`,
  value: i.toString(),
}));

export const SCHEDULE_MINUTE_OPTIONS: LabelValuePair[] = Array.from({ length: 12 }, (_, i) => {
  const minute = i * 5;
  return {
    label: `${minute.toString().padStart(2, '0')}`,
    value: minute.toString(),
  };
});
