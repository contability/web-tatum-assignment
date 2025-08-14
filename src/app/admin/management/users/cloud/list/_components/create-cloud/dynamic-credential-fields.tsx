'use client';

import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';
import FormField from '@Components/fields/form-field';
import Input from '@Components/fields/input';
import Fieldset from '@Components/fields/fieldset';
import { CREDENTIAL_FIELD_CONFIGS, CredentialFieldConfig } from '@Constants/credential-fields';
import { CloudFormValues } from '../../_schema/cloud';

interface DynamicCredentialFieldsProps {
  provider: string;
  credentialType: string;
  register: UseFormRegister<CloudFormValues>;
  errors: FieldErrors<CloudFormValues>;
}

const DynamicCredentialFields = ({ provider, credentialType, register, errors }: DynamicCredentialFieldsProps) => {
  if (!provider || !credentialType) {
    return null;
  }

  const providerConfig = CREDENTIAL_FIELD_CONFIGS[provider];
  if (!providerConfig) {
    return null;
  }

  const fields = providerConfig.fields[credentialType];
  if (!fields) {
    return null;
  }

  const renderField = (field: CredentialFieldConfig) => {
    const fieldName = field.name as keyof CloudFormValues;
    const fieldError = errors[fieldName] as FieldError;

    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      ...register(fieldName),
    };

    return (
      <FormField
        key={field.id}
        label={{ id: field.id, content: field.label }}
        isRequired={field.required}
        error={fieldError}
        labelClassName="min-w-[5.3rem] md:min-w-[6rem]"
      >
        {field.type === 'textarea' ? (
          <textarea
            {...commonProps}
            rows={6}
            className="resize-vertical w-full rounded-md border border-gray-300 bg-white p-2 text-base text-gray-800 placeholder-gray-500 transition-colors duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none md:text-lg lg:p-3 lg:text-xl"
          />
        ) : (
          <Input {...commonProps} type={field.type === 'password' ? 'password' : 'text'} />
        )}
      </FormField>
    );
  };

  return (
    <Fieldset heading={{ text: 'Credentials', type: 'h4', className: 'mb-6' }}>
      <div className="space-y-4 pl-8">{fields.map(renderField)}</div>
    </Fieldset>
  );
};

DynamicCredentialFields.displayName = 'DynamicCredentialFields';
export default DynamicCredentialFields;
