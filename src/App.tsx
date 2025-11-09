import './App.css'
import {MantineProvider} from '@mantine/core';
import theme from '@/theme/theme.ts';
import AppRoutes from '@/AppRoutes.tsx';
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

function App() {

  return (
    <MantineProvider theme={theme}>
      <AppRoutes/>
    </MantineProvider>
  )
}

export default App
