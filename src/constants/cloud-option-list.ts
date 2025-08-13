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

export const AWS_REGION_LIST: LabelValuePair[] = [
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
