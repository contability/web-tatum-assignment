import { CLOUD_LIST_DATA } from '@Constants/cloud-instance';
import { Cloud } from '@DataTypes/types';
import { NextRequest, NextResponse } from 'next/server';

const getCloudDetail = (cloudId: string): Promise<Cloud | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const cloudData = CLOUD_LIST_DATA.find(cloud => cloud.id === cloudId);
      resolve(cloudData);
    }, 500);
  });
};

export async function GET(request: NextRequest) {
  try {
    const cloudId = request.nextUrl.searchParams.get('cloud-id');

    if (!cloudId)
      return NextResponse.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'cloud-id parameter is required',
        },
        { status: 400 },
      );

    const cloudList = await getCloudDetail(cloudId);
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
