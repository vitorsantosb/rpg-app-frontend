import React from 'react';
import {Anchor, Button, Group, PasswordInput, Stack, TextInput} from '@mantine/core';

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('register', { email, password, confirmPassword });
      setLoading(false);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="formulário de cadastro">
      <Stack gap="md">
        <TextInput
          label="E-mail"
          placeholder="seu@exemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="email"
        />

        <PasswordInput
          label="Senha"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <PasswordInput
          label="Confirmar Senha"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />

        <Group justify="space-between">
          <Anchor component="button" type="button" onClick={onSwitch}>
            Já tenho conta
          </Anchor>
          <Button type="submit" loading={loading} aria-label="Registrar">
            Registrar
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default RegisterForm;