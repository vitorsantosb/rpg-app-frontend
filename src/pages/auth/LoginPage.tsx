import { Box, Card, Flex, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import LoginForm from '@/components/LoginPage/LoginForm.tsx';
import RegisterForm from '@/components/LoginPage/RegisterForm.tsx';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import {withAlpha} from '@/utils/withAlpha.utils.ts';

function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const background =
    colorScheme === 'dark'
      ? `radial-gradient(circle at 20% 20%, ${withAlpha(theme.colors.brand?.[4], 0.3)}, transparent 55%), radial-gradient(circle at 80% 0%, ${withAlpha(theme.colors.aurora?.[5], 0.25)}, transparent 50%), ${theme.other?.surfaces?.dark ?? '#090f1c'}`
      : `radial-gradient(circle at 25% 15%, ${withAlpha(theme.colors.brand?.[1], 0.35)}, transparent 55%), radial-gradient(circle at 75% 0%, ${withAlpha(theme.colors.aurora?.[2], 0.3)}, transparent 55%), ${theme.other?.surfaces?.light ?? '#f5f7fb'}`;

  const cardBackground =
    colorScheme === 'dark'
      ? theme.other?.panels?.dark ?? 'rgba(9,19,35,0.85)'
      : theme.other?.panels?.light ?? '#ffffff';

  const borderColor =
    colorScheme === 'dark'
      ? theme.other?.borders?.dark ?? 'rgba(255,255,255,0.08)'
      : theme.other?.borders?.light ?? 'rgba(15,23,42,0.08)';

  const supportingTextColor =
    colorScheme === 'dark'
      ? withAlpha(theme.colors.midnight?.[1] ?? '#cbd5f5', 0.85)
      : withAlpha(theme.colors.midnight?.[5] ?? '#4d6e9e', 0.9);

  const disclaimerColor =
    colorScheme === 'dark'
      ? withAlpha(theme.white, 0.45)
      : withAlpha(theme.black, 0.45);

  return (
    <Box
      component="section"
      style={{
        width: '100vw',
        height: '100vh',
        background,
        transition: 'background 200ms ease',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Flex
        h="100%"
        align="stretch"
        justify="flex-start"
        style={{
          width: '100%',
          paddingTop: '96px',
          paddingLeft: 'max(6vw, 3rem)',
        }}
      >
        <Card
          style={{
            background: cardBackground,
            border: `1px solid ${borderColor}`,
            boxShadow:
              colorScheme === 'dark'
                ? '0 35px 60px rgba(3,7,18,0.6)'
                : '0 24px 48px rgba(15,23,42,0.18)',
            backdropFilter: 'blur(20px)',
          }}
          w={520}
          h="calc(100% - 120px)"
          radius="md"
          shadow="md"
          p="xl"
          withBorder
        >
          <Stack h="100%" gap="xl" justify="space-between">
            <Stack gap={4}>
              <Flex justify="space-between" align="center">
                <Title
                  order={2}
                  c={colorScheme === 'dark' ? theme.white : theme.colors.midnight?.[9] ?? theme.black}
                >
                  {mode === 'login' ? 'Entrar' : 'Criar conta'}
                </Title>
                <ThemeToggle tooltipPosition="left" size="md" />
              </Flex>
              <Text size="sm" c={supportingTextColor}>
                {mode === 'login'
                  ? 'Preencha seus dados para acessar o painel de controle.'
                  : 'Crie sua conta e personalize a sua experiência no painel.'}
              </Text>
            </Stack>

            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: '100%' }}
                >
                  <LoginForm onSwitch={() => setMode('register')} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: '100%' }}
                >
                  <RegisterForm onSwitch={() => setMode('login')} />
                </motion.div>
              )}
            </AnimatePresence>
            <Text size="xs" ta="center" c={disclaimerColor}>
              Ao continuar você concorda com os termos de uso e privacidade.
            </Text>
          </Stack>
        </Card>
      </Flex>
    </Box>
  );
}

export default LoginPage;

