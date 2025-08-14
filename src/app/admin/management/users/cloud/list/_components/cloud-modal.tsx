'use client';

import FormField from '@Components/fields/form-field';
import Input from '@Components/fields/input';
import Select from '@Components/fields/select';
import MultiSelect from '@Components/fields/multi-select';
import RadioGroup from '@Components/fields/radio-group';
import Fieldset from '@Components/fields/fieldset';
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
import { memo, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { cloudFormSchema, CloudFormValues } from '../_schema/cloud';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREDENTIAL_FIELD_CONFIGS } from '@Constants/credential-fields';
import { FIELD_LEVELS, FREQUENCY_LEVELS } from '@Constants/schedule-levels';
import DynamicCredentialFields from './create-cloud/dynamic-credential-fields';
import { useCloudDetail } from 'lib/services/cloud/client';
import Loading from '@Components/spinner/circle';

interface CloudModalProps {
  isOpen: boolean;
  cloudId?: string;
  handleCloseModal: () => void;
  onSubmit: (formData: CloudFormValues) => void;
}

const CloudModal = ({ isOpen, cloudId, handleCloseModal, onSubmit }: CloudModalProps) => {
  const { data: cloudDetailData, isLoading: isDetailDataLoading } = useCloudDetail(cloudId, isOpen);
  const cloudDetailResult = cloudDetailData?.result;
  const isEditMode = !!cloudId;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    setValue,
    reset,
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
      region: [],
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

  const resetFormToOriginalData = useCallback(() => {
    if (!cloudDetailResult) return;

    const scheduleSettings = cloudDetailResult.scheduleScanSetting;

    setValue('name', cloudDetailResult.name || '');
    setValue('provider', cloudDetailResult.provider || '');
    setValue('credentialType', cloudDetailResult.credentialType || '');
    setValue('region', cloudDetailResult.regionList || []);
    setValue('proxyUrl', cloudDetailResult.proxyUrl || '');
    setValue('scheduleScanEnabled', cloudDetailResult.scheduleScanEnabled ? 'true' : 'false');

    if (scheduleSettings) {
      setValue('frequency', scheduleSettings.frequency || '');
      setValue('date', scheduleSettings.date || '');
      setValue('weekday', scheduleSettings.weekday || '');
      setValue('hour', scheduleSettings.hour || '');
      setValue('minute', scheduleSettings.minute || '');
    }

    if (cloudDetailResult.eventSource && 'cloudTrailName' in cloudDetailResult.eventSource) {
      setValue('cloudTrailName', cloudDetailResult.eventSource.cloudTrailName || '');
    }

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
  }, [cloudDetailResult, setValue]);

  const handleClose = () => {
    if (isEditMode && cloudDetailResult) resetFormToOriginalData();
    else reset();
    handleCloseModal();
  };

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

  useEffect(() => {
    if (isEditMode && cloudDetailResult) resetFormToOriginalData();
  }, [isEditMode, cloudDetailResult, resetFormToOriginalData]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="w-full max-w-4xl md:max-w-[80rem]">
      <div className="w-full rounded-md bg-white shadow-md">
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-4xl font-bold">{isEditMode ? 'Edit Cloud' : 'Create Cloud'}</h2>
          <button
            onClick={handleClose}
            aria-label="모달 닫기"
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <IoMdClose size={15} />
          </button>
        </div>

        {isEditMode && isDetailDataLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loading />
            <span className="ml-3 text-gray-600">클라우드 정보를 불러오는 중...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-[40rem] divide-y divide-gray-300 overflow-y-auto px-8 md:max-h-[50rem]">
              <Fieldset heading={{ text: '기본 클라우드 정보', type: 'legend' }}>
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
              </Fieldset>

              <DynamicCredentialFields
                provider={providerValue}
                credentialType={credentialTypeValue}
                register={register}
                errors={errors}
              />

              <Fieldset heading={{ text: '클라우드 설정', type: 'legend' }}>
                <FormField
                  label={{ content: 'Region' }}
                  isLineBreak={true}
                  error={Array.isArray(errors.region) ? errors.region[0] : errors.region}
                >
                  <MultiSelect
                    optionList={AWS_REGION_OPTIONS}
                    value={regionValue}
                    register={register('region')}
                    placeholder="Please select regions."
                  />
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
                    className="flex flex-col gap-2 md:flex-row"
                  />
                </FormField>
              </Fieldset>

              <Fieldset
                heading={{ text: 'Set Scan Frequency', type: 'h4' }}
                description="Scan Schedule: Daily 12:00 AM"
              >
                <Select
                  optionList={SCHEDULE_FREQUENCY_OPTIONS}
                  value={frequencyValue}
                  register={register('frequency')}
                />
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
              </Fieldset>

              <Fieldset heading={{ text: 'Event Integration', type: 'h4' }}>
                <div className="space-y-4 pl-2">
                  <FormField
                    label={{ id: 'cloud-trail-name', content: 'CloudTrail Name' }}
                    error={errors.cloudTrailName}
                  >
                    <Input
                      id="cloud-trail-name"
                      placeholder="Please enter the cloud trail name."
                      {...register('cloudTrailName')}
                      value={cloudTrailNameValue}
                    />
                  </FormField>
                </div>
              </Fieldset>
            </div>

            <div className="flex items-center justify-end gap-3 px-8 py-6">
              <BasicButton onClick={handleClose} type="button" variant="outline">
                Cancel
              </BasicButton>
              <ConfirmButton type="submit" theme="blue" isValid={isValid}>
                {isEditMode ? 'Update' : 'Review'}
              </ConfirmButton>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

CloudModal.displayName = 'CloudModal';
export default memo(CloudModal);
