import { MantineProvider, Text } from '@mantine/core';
import './App.css';

export default function App() {
  console.log('hi');
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Mantine!</Text>
    </MantineProvider>
  );
}
