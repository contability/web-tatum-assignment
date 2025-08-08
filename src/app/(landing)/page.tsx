import Link from 'next/link';
import React from 'react';

const RendingPage = () => {
  return (
    <Link href="/admin/management/users/cloud/list" className="bg-amber-800">
      go to Users Cloud Management
    </Link>
  );
};

export default RendingPage;
