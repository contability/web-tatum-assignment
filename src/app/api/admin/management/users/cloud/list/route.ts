import { CLOUD_LIST_DATA } from '@Constants/cloud-instance';
import { Cloud } from '@DataTypes/types';
import { NextResponse } from 'next/server';

const getCloudListWithDelay = (): Promise<Cloud[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(CLOUD_LIST_DATA);
    }, 500);
  });
};

export async function GET() {
  try {
    const cloudList = await getCloudListWithDelay();
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
