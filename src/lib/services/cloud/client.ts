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
