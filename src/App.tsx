import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import './App.css';
import { MantineProvider } from '@mantine/core';

import AppRoutes from '@/AppRoutes.tsx';
import theme from '@/theme/theme.ts';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" withCssVariables withGlobalStyles>
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
