import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import './App.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '@/AppRoutes.tsx';
import theme from '@/theme/theme.ts';
import { AuthProvider } from '@/contexts/AuthContext.tsx';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" withCssVariables>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
