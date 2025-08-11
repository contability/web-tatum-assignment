'use client';

import Chip from '@Components/chip';
import ResponsiveDataView from '@Components/data-display/responsive-data-view';
import Table from '@Components/table/table';
import TableHeader from '@Components/table/table-header';
import TableHeaderCell from '@Components/table/table-header-cell';
import TableBody from '@Components/table/table-body';
import TableRow from '@Components/table/table-row';
import TableCell from '@Components/table/table-cell';
import MobileCard from '@Components/card/mobile-card';
import MobileCardField from '@Components/card/mobile-card-field';
import ActionButton from '@Components/button/action-button';
import { useCloudList } from 'lib/services/cloud/client';
import Loading from '@Components/spinner/circle';
import EmptyState from '@Components/data-display/empty-state';

const CloudContentList = () => {
  const { data: cloudListData, isLoading } = useCloudList();
  const dataResult = cloudListData?.result;

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-center py-8">
          <Loading />
        </div>
      </section>
    );
  }

  if (!dataResult || dataResult.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-center py-8">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section>
      <ResponsiveDataView
        ariaLabel="클라우드 계정 목록"
        desktopView={
          <Table>
            <TableHeader>
              <TableHeaderCell>Provider</TableHeaderCell>
              <TableHeaderCell>Account</TableHeaderCell>
              <TableHeaderCell>Cloud Group</TableHeaderCell>
              <TableHeaderCell>Organization</TableHeaderCell>
              <TableHeaderCell>Account ID</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Event Process</TableHeaderCell>
              <TableHeaderCell>Scan Schedule</TableHeaderCell>
              <TableHeaderCell>Real Time</TableHeaderCell>
              <TableHeaderCell>User Activity</TableHeaderCell>
              <TableHeaderCell>Credential Type</TableHeaderCell>
              <TableHeaderCell>Edit</TableHeaderCell>
              <TableHeaderCell>Delete</TableHeaderCell>
            </TableHeader>

            <TableBody>
              {dataResult.map(cloudData => (
                <TableRow key={`cloud-list__${cloudData.id}`}>
                  <TableCell>
                    <span className="font-medium text-blue-600">{cloudData.provider}</span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">{cloudData.name}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-1 overflow-x-auto">
                      {cloudData.cloudGroupName && cloudData.cloudGroupName.length > 0 ? (
                        cloudData.cloudGroupName.map(groupName => (
                          <Chip key={`cloud-group-${groupName}`} variant="primary">
                            {groupName}
                          </Chip>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-gray-600">Organization Account</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-gray-600">Account ID</span>
                  </TableCell>

                  <TableCell>
                    <Chip variant="success">READY</Chip>
                  </TableCell>

                  <TableCell>
                    <Chip variant={cloudData.eventProcessEnabled ? 'success' : 'error'}>
                      {cloudData.eventProcessEnabled ? 'VALID' : 'INVALID'}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Chip variant={cloudData.scheduleScanEnabled ? 'success' : 'neutral'}>
                      {cloudData.scheduleScanEnabled ? 'Set' : 'Not Set'}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Chip variant="success">ON</Chip>
                  </TableCell>

                  <TableCell>
                    <Chip variant={cloudData.userActivityEnabled ? 'success' : 'neutral'}>
                      {cloudData.userActivityEnabled ? 'ON' : 'OFF'}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-gray-600">{cloudData.credentialType}</span>
                  </TableCell>

                  <TableCell>
                    <ActionButton theme="blue" aria-label={`${cloudData.name} 편집`}>
                      EDIT
                    </ActionButton>
                  </TableCell>

                  <TableCell>
                    <ActionButton theme="red" aria-label={`${cloudData.name} 삭제`}>
                      DELETE
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        mobileView={dataResult.map(cloudData => (
          <MobileCard
            key={`mobile-cloud-${cloudData.id}`}
            title={
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{cloudData.name}</h3>
                <p className="font-medium text-blue-600">{cloudData.provider}</p>
              </div>
            }
            actions={
              <>
                <ActionButton theme="blue" aria-label={`${cloudData.name} 편집`}>
                  EDIT
                </ActionButton>
                <ActionButton theme="red" aria-label={`${cloudData.name} 삭제`}>
                  DELETE
                </ActionButton>
              </>
            }
          >
            <MobileCardField label="Cloud Group">
              {cloudData.cloudGroupName && cloudData.cloudGroupName.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {cloudData.cloudGroupName.map(groupName => (
                    <Chip key={`mobile-group-${groupName}`} variant="primary">
                      {groupName}
                    </Chip>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </MobileCardField>

            <MobileCardField label="Status">
              <Chip variant="success">READY</Chip>
            </MobileCardField>

            <MobileCardField label="Event Process">
              <Chip variant={cloudData.eventProcessEnabled ? 'success' : 'error'}>
                {cloudData.eventProcessEnabled ? 'VALID' : 'INVALID'}
              </Chip>
            </MobileCardField>

            <MobileCardField label="Scan Schedule">
              <Chip variant={cloudData.scheduleScanEnabled ? 'success' : 'neutral'}>
                {cloudData.scheduleScanEnabled ? 'Set' : 'Not Set'}
              </Chip>
            </MobileCardField>

            <MobileCardField label="User Activity">
              <Chip variant={cloudData.userActivityEnabled ? 'success' : 'neutral'}>
                {cloudData.userActivityEnabled ? 'ON' : 'OFF'}
              </Chip>
            </MobileCardField>

            <MobileCardField label="Credential Type">
              <span className="text-gray-600">{cloudData.credentialType}</span>
            </MobileCardField>
          </MobileCard>
        ))}
      />
    </section>
  );
};

export default CloudContentList;
