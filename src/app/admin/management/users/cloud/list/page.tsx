import Link from 'next/link';
import CloudContentList from './_components/cloud-content-list';
import { prefetchCloudList } from 'lib/services/cloud/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const AdminManagementUsersCloudListPage = async () => {
  const queryClient = await prefetchCloudList();
  return (
    <main className="space-y-8 p-11">
      <section>
        <Link
          href="/admin/management/users/cloud/register"
          className="inline-block rounded-md border border-primary-blue px-4 py-3 text-primary-blue transition-colors hover:bg-primary-blue-light"
        >
          Create Cloud
        </Link>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CloudContentList />
      </HydrationBoundary>
    </main>
  );
};

export default AdminManagementUsersCloudListPage;
