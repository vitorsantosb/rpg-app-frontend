import React, {useState} from 'react';
import {Anchor, Button, Group, PasswordInput, Stack, TextInput} from '@mantine/core';
import {NotificationMessages} from '@/components/notification/Notification.tsx';
import {apiService} from '@/services/axios.service.ts';
import type {AxiosError} from 'axios';

interface RegisterResponse {
  message?: string;
  request?: {
    token?: string;
  };
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      await NotificationMessages.toasty.error('As senhas não coincidem. Por favor, verifique e tente novamente.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      await NotificationMessages.toasty.warning('A senha deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.post<RegisterResponse>('/user/register', {
        email,
        username,
        contacts: [],
        password,
      });

      if (response.status === 201 || response.status === 200) {
        await NotificationMessages.success('Conta criada com sucesso! Você já pode fazer login.');

        setTimeout(() => {
          onSwitch();
        }, 1000);
      }
    } catch (err) {
      const error = err as AxiosError<{message?: string}>;
      console.log(error);
      const errorMessage = 'Erro ao criar conta. Verifique os dados e tente novamente.';

      await NotificationMessages.error(errorMessage);
      console.error('Erro ao registrar:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="formulário de cadastro">
      <Stack gap="md">
        <TextInput
          label="Nome de Usuário"
          placeholder="nome de usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          autoComplete="username"
        />

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
