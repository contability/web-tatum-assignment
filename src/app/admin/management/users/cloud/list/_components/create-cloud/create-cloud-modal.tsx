'use client';

import FormField from '@Components/fields/form-field';
import Input from '@Components/fields/input';
import Select from '@Components/fields/select';
import RadioGroup from '@Components/fields/radio-group';
import Modal from '@Components/modal';
import BasicButton from '@Components/button/basic-button';
import ConfirmButton from '@Components/button/confirm-button';
import {
  AWS_REGION_OPTIONS,
  PROVIDER_OPTIONS,
  SCHEDULE_DATE_OPTIONS,
  SCHEDULE_FREQUENCY_OPTIONS,
  SCHEDULE_HOUR_OPTIONS,
  SCHEDULE_MINUTE_OPTIONS,
  SCHEDULE_WEEKDAY_OPTIONS,
} from '@Constants/cloud-option-list';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { cloudFormSchema, CloudFormValues } from '../../_schema/cloud';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREDENTIAL_FIELD_CONFIGS } from '@Constants/credential-fields';
import { FIELD_LEVELS, FREQUENCY_LEVELS } from '@Constants/schedule-levels';
import DynamicCredentialFields from './dynamic-credential-fields';

interface CreateCloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CloudFormValues) => void;
}

const CreateCloudModal = ({ isOpen, onClose, onSubmit }: CreateCloudModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<CloudFormValues>({
    resolver: zodResolver(cloudFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      provider: '',
      credentialType: '',

      accessKey: '',
      secretAccessKey: '',
      roleArn: '',
      tenantId: '',
      subscriptionId: '',
      applicationId: '',
      secretKey: '',
      projectId: '',
      jsonText: '',
      region: '',
      proxyUrl: '',
      scheduleScanEnabled: 'true',
      frequency: '',
      date: '',
      weekday: '',
      hour: '',
      minute: '',
      cloudTrailName: '',
    },
  });

  const nameValue = watch('name');
  const providerValue = watch('provider');
  const credentialTypeValue = watch('credentialType');
  const regionValue = watch('region');
  const proxyUrlValue = watch('proxyUrl');
  const frequencyValue = watch('frequency');
  const dateValue = watch('date');
  const weekdayValue = watch('weekday');
  const hourValue = watch('hour');
  const minuteValue = watch('minute');
  const cloudTrailNameValue = watch('cloudTrailName');

  const getCredentialTypeOptions = () => {
    if (!providerValue) return [];
    const providerConfig = CREDENTIAL_FIELD_CONFIGS[providerValue];
    return providerConfig?.credentialTypes || [];
  };

  const isFieldEnabled = (frequency: string, fieldName: keyof typeof FIELD_LEVELS) => {
    const frequencyLevel = FREQUENCY_LEVELS[frequency as keyof typeof FREQUENCY_LEVELS] || 0;
    const fieldLevel = FIELD_LEVELS[fieldName];

    if (fieldName === 'weekday') {
      return frequencyLevel === 3;
    }

    return frequencyLevel >= fieldLevel;
  };

  useEffect(() => {
    if (providerValue) {
      setValue('credentialType', '');

      const allCredentialFieldNames = [
        'accessKey',
        'secretAccessKey',
        'roleArn',
        'tenantId',
        'subscriptionId',
        'applicationId',
        'secretKey',
        'projectId',
        'jsonText',
      ];
      allCredentialFieldNames.forEach(fieldName => {
        setValue(fieldName as keyof CloudFormValues, '');
      });
    }
  }, [providerValue, setValue]);

  useEffect(() => {
    if (frequencyValue) {
      const scheduleFields = ['date', 'weekday', 'hour', 'minute'] as const;
      scheduleFields.forEach(fieldName => {
        if (!isFieldEnabled(frequencyValue, fieldName)) {
          setValue(fieldName, '');
        }
      });
    }
  }, [frequencyValue, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-4xl md:max-w-[80rem]">
      <div className="w-full rounded-md bg-white shadow-md">
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-4xl font-bold">Create Cloud</h2>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <IoMdClose size={15} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[40rem] divide-y divide-gray-300 overflow-y-auto px-8 md:max-h-[50rem]">
            <fieldset className="space-y-6 py-8">
              <legend className="sr-only">기본 클라우드 정보</legend>
              <FormField
                label={{ id: 'cloud-name', content: 'Cloud Name' }}
                isLineBreak={true}
                isRequired={true}
                error={errors.name}
              >
                <Input
                  id="cloud-name"
                  placeholder="Please enter the cloud name."
                  {...register('name')}
                  value={nameValue}
                />
              </FormField>

              <FormField label={{ content: 'Select Provider' }} isLineBreak={true} error={errors.provider}>
                <Select optionList={PROVIDER_OPTIONS} register={register('provider')} value={providerValue} />
              </FormField>

              {providerValue && (
                <FormField
                  label={{ content: 'Select Key Registration Method' }}
                  isLineBreak={true}
                  error={errors.credentialType}
                >
                  <Select
                    optionList={getCredentialTypeOptions()}
                    register={register('credentialType')}
                    value={credentialTypeValue}
                  />
                </FormField>
              )}
            </fieldset>

            <DynamicCredentialFields
              provider={providerValue}
              credentialType={credentialTypeValue}
              register={register}
              errors={errors}
            />

            <fieldset className="space-y-6 py-8">
              <legend className="sr-only">클라우드 설정</legend>
              <FormField label={{ content: 'Region' }} isLineBreak={true} error={errors.region}>
                {/* TODO: 멀티 셀렉트 기능 필요. */}
                <Select optionList={AWS_REGION_OPTIONS} value={regionValue} register={register('region')} />
              </FormField>

              <FormField label={{ id: 'proxy-url', content: 'Proxy URL' }} isLineBreak={true} error={errors.proxyUrl}>
                <Input
                  id="proxy-url"
                  placeholder="Please enter the proxy URL."
                  {...register('proxyUrl')}
                  value={proxyUrlValue}
                />
              </FormField>

              <FormField
                label={{ content: 'Scan Schedule Setting' }}
                isLineBreak={true}
                error={errors.scheduleScanEnabled}
              >
                <RadioGroup
                  optionList={[
                    { value: 'true', label: 'Enabled' },
                    { value: 'false', label: 'Disabled' },
                  ]}
                  name="scheduleScanEnabled"
                  control={control}
                  className="flex flex-col items-center gap-2 md:flex-row"
                />
              </FormField>
            </fieldset>

            <fieldset className="space-y-6 py-8">
              <legend>Set Scan Frequency</legend>
              <p className="text-sm text-gray-700 md:text-base">Scan Schedule: Daily 12:00 AM</p>
              <Select optionList={SCHEDULE_FREQUENCY_OPTIONS} value={frequencyValue} register={register('frequency')} />
              <div className="space-y-4 pl-8">
                <FormField labelClassName="w-28 text-right" label={{ content: 'Date' }} error={errors.date}>
                  <Select
                    optionList={SCHEDULE_DATE_OPTIONS}
                    value={dateValue}
                    register={register('date')}
                    isDisabled={!isFieldEnabled(frequencyValue, 'date')}
                  />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Day of Week' }} error={errors.weekday}>
                  <Select
                    optionList={SCHEDULE_WEEKDAY_OPTIONS}
                    value={weekdayValue}
                    register={register('weekday')}
                    isDisabled={!isFieldEnabled(frequencyValue, 'weekday')}
                  />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Hour' }} error={errors.hour}>
                  <Select
                    optionList={SCHEDULE_HOUR_OPTIONS}
                    value={hourValue}
                    register={register('hour')}
                    isDisabled={!isFieldEnabled(frequencyValue, 'hour')}
                  />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Minute' }} error={errors.minute}>
                  <Select
                    optionList={SCHEDULE_MINUTE_OPTIONS}
                    value={minuteValue}
                    register={register('minute')}
                    isDisabled={!isFieldEnabled(frequencyValue, 'minute')}
                  />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="space-y-6 py-8">
              <legend>Event Integration</legend>
              <div className="space-y-4 pl-2">
                <FormField label={{ id: 'cloud-trail-name', content: 'CloudTrail Name' }} error={errors.cloudTrailName}>
                  <Input
                    id="cloud-trail-name"
                    placeholder="Please enter the cloud trail name."
                    {...register('cloudTrailName')}
                    value={cloudTrailNameValue}
                  />
                </FormField>
              </div>
            </fieldset>
          </div>

          <div className="flex items-center justify-end gap-3 px-8 py-6">
            <BasicButton onClick={onClose} type="button" variant="outline">
              Cancel
            </BasicButton>
            <ConfirmButton type="submit" theme="blue" isValid={isValid}>
              Review
            </ConfirmButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

CreateCloudModal.displayName = 'CreateCloudModal';
export default memo(CreateCloudModal);
