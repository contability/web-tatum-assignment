import Link from 'next/link';
import CloudContentList from './_components/cloud-content-list';

const AdminManagementUsersCloudListPage = () => {
  return (
    <main className="p-11">
      <section>
        <Link
          href="/admin/management/users/cloud/register"
          className="inline-block rounded-md border border-primary-blue px-4 py-3 text-primary-blue transition-colors hover:bg-primary-blue-light"
        >
          Create Cloud
        </Link>
      </section>
      <CloudContentList />
    </main>
  );
};

export default AdminManagementUsersCloudListPage;
