import type { Preview } from '@storybook/nextjs-vite';
import '@Styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
    layout: 'centered',
  },
};

export default preview;
