import { CLOUD_LIST_DATA } from '@Constants/cloud-instance';
import { Cloud } from '@DataTypes/types';
import { NextResponse } from 'next/server';

const getCloudList = (): Promise<Cloud[]> => {
  return new Promise(resolve => {
    resolve(CLOUD_LIST_DATA);
  });
};

export async function GET() {
  try {
    const cloudList = await getCloudList();
    return NextResponse.json({
      success: true,
      httpStatusCode: 200,
      result: cloudList,
    });
  } catch (error) {
    console.error('Error fetching cloud list:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cloud list',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}
