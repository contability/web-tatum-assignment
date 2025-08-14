'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_FACTORY } from '../query-key-factory';
import { axiosClientAPI } from '../api-instance';
import { StandardResponse } from '@DataTypes/api/standard-response';
import { Cloud } from '@DataTypes/types';

const getAdminCloudList = async () => {
  const result = await axiosClientAPI().get<StandardResponse<Cloud[]>>('/admin/management/users/cloud/list');
  return result.data;
};

export const useCloudList = () => {
  return useQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
    queryFn: async () => await getAdminCloudList(),
    refetchOnWindowFocus: false,
  });
};

const getAdminCloudDetail = async (cloudId: string) => {
  const result = await axiosClientAPI().get<StandardResponse<Cloud>>(
    `/admin/management/users/cloud/detail?cloud-id=${cloudId}`,
  );
  return result.data;
};

export const useCloudDetail = (cloudId?: string, isModalOpen?: boolean) => {
  return useQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').detail(cloudId || ''),
    queryFn: async () => await getAdminCloudDetail(cloudId || ''),
    refetchOnWindowFocus: false,
    enabled: !!cloudId && !!isModalOpen,
  });
};
