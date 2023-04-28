import AppShell from './AppShell';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'experiments/shell',
  component: AppShell,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    primary: true,
    label: 'Button',
  },
};
