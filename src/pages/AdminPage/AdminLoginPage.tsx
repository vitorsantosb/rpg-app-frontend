import {
  Card,
  Flex,
  Title,
} from '@mantine/core';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '@/components/LoginPage/LoginForm.tsx';
import RegisterForm from '@/components/LoginPage/RegisterForm.tsx';

function AdminLoginPage() {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'flex-start', // deixa o Card colado à esquerda
        alignItems: 'stretch',
      }}
    >
      <Card
        style={{
          background: 'rgba(27, 12, 71, 0.85)', // fundo semi-transparente
        }}
        w={520}       // largura fixa do painel
        h="100%"      // altura completa
        radius="md"
        shadow="md"
        p="xl"
      >
        <Flex direction="column" justify="center" align="center" h="100%">
          <Title c={'white'} order={2}>
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Title>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <LoginForm onSwitch={() => setMode('register')} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <RegisterForm onSwitch={() => setMode('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      </Card>
    </div>

  );
}

export default AdminLoginPage;
