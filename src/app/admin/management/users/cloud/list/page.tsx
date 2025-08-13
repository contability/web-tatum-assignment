import CloudContentList from './_components/cloud-content-list';
import { prefetchCloudList } from 'lib/services/cloud/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import CreateCloudContainer from './_components/create-cloud/create-cloud-container';

const AdminManagementUsersCloudListPage = async () => {
  const queryClient = await prefetchCloudList();
  return (
    <main className="space-y-8 p-11">
      {/* TODO: 탭 컴포넌트 추가 필요. */}
      <section>
        {/* TODO: search form 퍼블리싱 필요 */}
        <CreateCloudContainer />
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CloudContentList />
      </HydrationBoundary>
    </main>
  );
};

export default AdminManagementUsersCloudListPage;
