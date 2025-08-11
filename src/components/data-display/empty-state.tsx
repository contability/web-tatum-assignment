import { TbDatabaseOff } from 'react-icons/tb';

const EmptyState = () => (
  <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-11 text-center">
    <TbDatabaseOff className="mb-4 text-gray-500" size={100} />
    <h3 className="text-20-b text-primary-800 mb-1">데이터가 없습니다</h3>
  </div>
);

export default EmptyState;
