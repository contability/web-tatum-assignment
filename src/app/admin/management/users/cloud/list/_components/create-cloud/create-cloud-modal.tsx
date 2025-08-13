'use client';

import FormField from '@Components/fields/form-field';
import Input from '@Components/fields/input';
import Select from '@Components/fields/select';
import RadioGroup from '@Components/fields/radio-group';
import Modal from '@Components/modal';
import BasicButton from '@Components/button/basic-button';
import ConfirmButton from '@Components/button/confirm-button';
import { AWS_CREDENTIAL_TYPE_OPTIONS, AWS_REGION_LIST, PROVIDER_OPTIONS } from '@Constants/cloud-option-list';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { cloudFormSchema, CloudFormValues } from '../../_schema/cloud';
import { zodResolver } from '@hookform/resolvers/zod';

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
  } = useForm<CloudFormValues>({
    resolver: zodResolver(cloudFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      provider: '',
      credentialType: '',
      accessKey: '',
      secretAccessKey: '',
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
  const accessKeyValue = watch('accessKey');
  const secretAccessKeyValue = watch('secretAccessKey');
  const regionValue = watch('region');
  const proxyUrlValue = watch('proxyUrl');
  const frequencyValue = watch('frequency');
  const dateValue = watch('date');
  const weekdayValue = watch('weekday');
  const hourValue = watch('hour');
  const minuteValue = watch('minute');
  const cloudTrailNameValue = watch('cloudTrailName');

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

              <FormField
                label={{ content: 'Select Key Registration Method' }}
                isLineBreak={true}
                error={errors.credentialType}
              >
                <Select
                  optionList={AWS_CREDENTIAL_TYPE_OPTIONS}
                  register={register('credentialType')}
                  value={credentialTypeValue}
                />
              </FormField>
            </fieldset>

            <fieldset className="py-8">
              <legend className="mb-6">Credentials</legend>
              <div className="space-y-4 pl-8">
                <FormField
                  label={{ id: 'access-key', content: 'Access Key' }}
                  isRequired={true}
                  error={errors.accessKey}
                >
                  <Input id="access-key" {...register('accessKey')} value={accessKeyValue} />
                </FormField>
                <FormField
                  label={{ id: 'secret-key', content: 'Secret Key' }}
                  isRequired={true}
                  error={errors.secretAccessKey}
                >
                  <Input id="secret-key" {...register('secretAccessKey')} value={secretAccessKeyValue} />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="space-y-6 py-8">
              <legend className="sr-only">클라우드 설정</legend>
              <FormField label={{ content: 'Region' }} isLineBreak={true} error={errors.region}>
                <Select optionList={AWS_REGION_LIST} value={regionValue} register={register('region')} />
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
              <Select optionList={AWS_REGION_LIST} value={frequencyValue} register={register('frequency')} />
              <div className="space-y-4 pl-8">
                <FormField labelClassName="w-28 text-right" label={{ content: 'Date' }} error={errors.date}>
                  <Select optionList={AWS_REGION_LIST} value={dateValue} register={register('date')} />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Day of Week' }} error={errors.weekday}>
                  <Select optionList={AWS_REGION_LIST} value={weekdayValue} register={register('weekday')} />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Hour' }} error={errors.hour}>
                  <Select optionList={AWS_REGION_LIST} value={hourValue} register={register('hour')} />
                </FormField>
                <FormField labelClassName="w-28 text-right" label={{ content: 'Minute' }} error={errors.minute}>
                  <Select optionList={AWS_REGION_LIST} value={minuteValue} register={register('minute')} />
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
