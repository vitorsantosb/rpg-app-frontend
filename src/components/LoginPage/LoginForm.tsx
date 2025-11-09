import React from 'react';
import {Anchor, Button, Group, PasswordInput, Stack, TextInput} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../models/routes.ts';

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  function navigateToDashboard(){
    navigate(appRoutes.DASHBOARD.ROOT);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('login', { email, password });
      setLoading(false);

      navigateToDashboard();
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="formulário de login">
      <Stack gap="md">
        <TextInput
          c='white'
          label="E-mail"
          placeholder="seu@exemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="email"
        />

        <PasswordInput
          c='white'
          label="Senha"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="current-password"
        />

        <Group justify="space-between">
          <Anchor component="button" type="button" onClick={onSwitch}>
            Criar conta
          </Anchor>
          <Button type="submit" loading={loading} aria-label="Entrar">
            Entrar
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default LoginForm;