import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY_FACTORY } from '../query-key-factory';
import { axiosServerAPI } from '../api-instance';
import { Cloud } from '@DataTypes/types';
import { StandardResponse } from '@DataTypes/api/common';

const fetchAdminCloudList = async () => {
  const result = await axiosServerAPI().get<StandardResponse<Cloud[]>>('/admin/management/users/cloud/list');
  return result.data;
};

export const prefetchCloudList = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
    queryFn: async () => await fetchAdminCloudList(),
  });

  return queryClient;
};
