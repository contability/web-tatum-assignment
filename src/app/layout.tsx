import ReactQueryClientProvider from '@Components/providers/react-query-client-provider';
import '@Styles/global.css';

import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

const title = '테이텀 사전 과제';
const description = '테이텀 시큐리티 직무 적합성 판단을 위한 사전 과제';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
};

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    title: title,
    description: description,
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
