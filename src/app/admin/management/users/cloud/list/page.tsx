import CloudContentList from './_components/cloud-content-list';
import { prefetchCloudList } from 'lib/services/cloud/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import CreateButton from './_components/create-button';

const AdminManagementUsersCloudListPage = async () => {
  const queryClient = await prefetchCloudList();
  return (
    <main className="space-y-8 p-11">
      <section>
        <CreateButton />
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CloudContentList />
      </HydrationBoundary>
    </main>
  );
};

export default AdminManagementUsersCloudListPage;
