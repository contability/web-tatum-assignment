import { LabelValuePair } from '@DataTypes/pair';
import { AWS_CREDENTIAL_TYPE_OPTIONS } from './cloud-option-list';

export interface CredentialFieldConfig {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'password' | 'textarea';
  placeholder: string;
  required: boolean;
}

export interface ProviderCredentialConfig {
  credentialTypes: LabelValuePair[];
  fields: Record<string, CredentialFieldConfig[]>;
}

export const CREDENTIAL_FIELD_CONFIGS: Record<string, ProviderCredentialConfig> = {
  AWS: {
    credentialTypes: AWS_CREDENTIAL_TYPE_OPTIONS,
    fields: {
      ACCESS_KEY: [
        {
          id: 'access-key',
          name: 'accessKey',
          label: 'Access Key',
          type: 'password',
          placeholder: 'Please enter the Access Key.',
          required: true,
        },
        {
          id: 'secret-key',
          name: 'secretAccessKey',
          label: 'Secret Key',
          type: 'password',
          placeholder: 'Please enter the Secret Key.',
          required: true,
        },
      ],
      ASSUME_ROLE: [
        {
          id: 'access-key',
          name: 'accessKey',
          label: 'Access Key',
          type: 'password',
          placeholder: 'Please enter the Access Key.',
          required: true,
        },
        {
          id: 'secret-key',
          name: 'secretAccessKey',
          label: 'Secret Key',
          type: 'password',
          placeholder: 'Please enter the Secret Key.',
          required: true,
        },
        {
          id: 'role-arn',
          name: 'roleArn',
          label: 'Role ARN',
          type: 'text',
          placeholder: 'Please enter the Role ARN',
          required: true,
        },
      ],
      ROLES_ANYWHERE: [
        {
          id: 'access-key',
          name: 'accessKey',
          label: 'Access Key',
          type: 'password',
          placeholder: 'Please enter the Access Key.',
          required: true,
        },
        {
          id: 'secret-key',
          name: 'secretAccessKey',
          label: 'Secret Key',
          type: 'password',
          placeholder: 'Please enter the Secret Key.',
          required: true,
        },
        {
          id: 'role-arn',
          name: 'roleArn',
          label: 'Role ARN',
          type: 'text',
          placeholder: 'Please enter the Role ARN',
          required: true,
        },
      ],
    },
  },
  AZURE: {
    credentialTypes: [
      {
        label: 'APPLICATION',
        value: 'APPLICATION',
      },
    ],
    fields: {
      APPLICATION: [
        {
          id: 'tenant-id',
          name: 'tenantId',
          label: 'Tenant ID',
          type: 'text',
          placeholder: 'Please enter the Azure Tenant ID.',
          required: true,
        },
        {
          id: 'subscription-id',
          name: 'subscriptionId',
          label: 'Subscription ID',
          type: 'text',
          placeholder: 'Please enter the Azure Subscription ID.',
          required: true,
        },
        {
          id: 'application-id',
          name: 'applicationId',
          label: 'Application ID',
          type: 'text',
          placeholder: 'Please enter the Azure Application ID.',
          required: true,
        },
        {
          id: 'secret-key',
          name: 'secretKey',
          label: 'Secret Key',
          type: 'password',
          placeholder: 'Please enter the Azure Secret Key.',
          required: true,
        },
      ],
    },
  },
  GCP: {
    credentialTypes: [
      {
        label: 'JSON TEXT',
        value: 'JSON_TEXT',
      },
    ],
    fields: {
      JSON_TEXT: [
        {
          id: 'project-id',
          name: 'projectId',
          label: 'Project ID',
          type: 'text',
          placeholder: 'GCP Project ID를 입력하세요 (선택사항).',
          required: false,
        },
        {
          id: 'json-text',
          name: 'jsonText',
          label: 'Service Account JSON',
          type: 'textarea',
          placeholder: 'GCP Service Account JSON을 입력하세요.',
          required: true,
        },
      ],
    },
  },
};
