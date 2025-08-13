'use client';

import { memo, useState } from 'react';
import CreateCloudButton from './create-cloud-button';
import CreateCloudModal from './create-cloud-modal';
import { CloudFormValues } from '../../_schema/cloud';
import { convertValidationObjectValue } from '@Utils/validation';

const CreateCloudContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (cloudFormValues: CloudFormValues) => {
    const body = convertValidationObjectValue(cloudFormValues);

    console.log('✨ Form validation passed');
    console.log('🚀 [Cloud Creation] POST /api/admin/management/users/cloud/list');
    console.log('📦 Request Body:', body);
    setIsModalOpen(false);
  };

  return (
    <>
      <CreateCloudButton onClick={handleOpenModal} />
      <CreateCloudModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

CreateCloudContainer.displayName = 'CreateCloudContainer';
export default memo(CreateCloudContainer);
