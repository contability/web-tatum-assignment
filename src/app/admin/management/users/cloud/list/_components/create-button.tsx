'use client';

import FormField from '@Components/fields/form-field';
import Input from '@Components/fields/input';
import Select from '@Components/fields/select';
import Modal from '@Components/modal';
import { AWS_CREDENTIAL_TYPE_OPTIONS, AWS_REGION_LIST, PROVIDER_OPTIONS } from '@Constants/cloud-option-list';
import { memo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-3 rounded-md border border-primary-blue px-4 py-3 text-primary-blue transition-colors hover:bg-primary-blue-light"
      >
        <FiPlus size={10} className="text-primary-blue" />
        <span>Create Cloud</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="mx-auto w-full max-w-4xl rounded-md bg-white shadow-md md:max-h-[80rem] md:max-w-7xl">
          <div className="flex items-center justify-between px-8 py-6">
            <h3 className="text-4xl font-bold">Create Cloud</h3>
            <button onClick={() => setIsModalOpen(false)}>
              <IoMdClose size={15} />
            </button>
          </div>
          <form onSubmit={() => {}}>
            <div className="max-h-[40rem] divide-y divide-gray-300 overflow-y-auto px-8 md:max-h-[50rem]">
              <fieldset className="space-y-6 py-8">
                <FormField label={{ id: 'cloud-name', content: 'Cloud Name' }} isLineBreak={true} isRequired={true}>
                  <Input id="cloud-name" placeholder="Please enter the cloud name." />
                </FormField>

                <FormField label={{ content: 'Select Provider' }} isLineBreak={true}>
                  <Select optionList={PROVIDER_OPTIONS} value="AWS" />
                </FormField>

                <FormField label={{ content: 'Select Key Registration Method' }} isLineBreak={true}>
                  <Select optionList={AWS_CREDENTIAL_TYPE_OPTIONS} value="ACCESS_KEY" />
                </FormField>
              </fieldset>

              <fieldset className="py-8">
                <h5 className="mb-6">Credentials</h5>
                <div className="space-y-4 pl-8">
                  <FormField label={{ id: 'access-key', content: 'Access Key' }} isRequired={true}>
                    <Input id="access-key" />
                  </FormField>
                  <FormField label={{ id: 'secret-key', content: 'Secret Key' }} isRequired={true}>
                    <Input id="secret-key" />
                  </FormField>
                </div>
              </fieldset>

              <fieldset className="space-y-6 py-8">
                <FormField label={{ content: 'Region' }} isLineBreak={true}>
                  <Select optionList={AWS_REGION_LIST} value="global" />
                </FormField>

                <FormField label={{ id: 'proxy-url', content: 'Proxy URL' }} isLineBreak={true}>
                  <Input id="proxy-url" placeholder="Please enter the proxy URL." />
                </FormField>

                <FormField label={{ content: 'Scan Schedule Setting' }} isLineBreak={true}>
                  {/* <Select optionList={AWS_CREDENTIAL_TYPE_OPTIONS} value="ACCESS_KEY" /> */}
                </FormField>
              </fieldset>

              <fieldset className="space-y-6 py-8">
                <h5>Set Scan Frequency</h5>
                <p className="text-sm text-gray-700 md:text-base">Scan Schedule: Daily 12:00 AM</p>
                <Select optionList={AWS_REGION_LIST} value="global" />
                <div className="space-y-4 pl-8">
                  <FormField labelClassName="w-28 text-right" label={{ content: 'Date' }}>
                    <Select optionList={AWS_REGION_LIST} value="global" />
                  </FormField>
                  <FormField labelClassName="w-28 text-right" label={{ content: 'Day of Week' }}>
                    <Select optionList={AWS_REGION_LIST} value="global" />
                  </FormField>
                  <FormField labelClassName="w-28 text-right" label={{ content: 'Hour' }}>
                    <Select optionList={AWS_REGION_LIST} value="global" />
                  </FormField>
                  <FormField labelClassName="w-28 text-right" label={{ content: 'Minute' }}>
                    <Select optionList={AWS_REGION_LIST} value="global" />
                  </FormField>
                </div>
              </fieldset>

              <fieldset className="space-y-6 py-8">
                <h5>Event Integration</h5>
                <div className="space-y-4 pl-2">
                  <FormField label={{ id: 'cloud-trail-name', content: 'CloudTrail Name' }}>
                    <Input id="cloud-trail-name" placeholder="Please enter the cloud trail name." />
                  </FormField>
                </div>
              </fieldset>
            </div>

            <div className="flex items-center justify-end gap-3 px-8 py-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md border border-gray-400 px-4 py-3 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {}}
                className="rounded-md border border-gray-400 px-4 py-3 transition-colors hover:bg-gray-200"
              >
                Review
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

CreateButton.displayName = 'CreateButton';
export default memo(CreateButton);
