'use client';

import { memo, useState } from 'react';
import EditCloudButton from './edit-cloud-button';
import CloudModal from '../cloud-modal';
import { CloudFormValues } from '../../_schema/cloud';
import { convertValidationObjectValue } from '@Utils/validation';

interface EditCloudContainerProps {
  cloudId: string;
  cloudName: string;
  size?: number;
}

const EditCloudContainer = ({ cloudId, cloudName, size = 20 }: EditCloudContainerProps) => {
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
    console.log('🚀 [Cloud Edit] PUT /api/admin/management/users/cloud/edit');
    console.log('📦 Request Body:', body);
    console.log('🆔 Cloud ID:', cloudId);
    setIsModalOpen(false);
  };

  return (
    <>
      <EditCloudButton cloudName={cloudName} onClick={handleOpenModal} size={size} />
      <CloudModal isOpen={isModalOpen} cloudId={cloudId} handleCloseModal={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

EditCloudContainer.displayName = 'EditCloudContainer';
export default memo(EditCloudContainer);
