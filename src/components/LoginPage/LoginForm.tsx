import React from 'react';
import {Anchor, Button, Group, PasswordInput, Stack, TextInput} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {appRoutes} from '@/models/routes.ts';
import {NotificationMessages} from '@/components/notification/Notification.tsx';
import {apiService} from '@/services/axios.service.ts';
import {useAuth} from '@/contexts/AuthContext.tsx';

interface LoginResponse {
  request?: {
    token?: string;
  };
  message?: string;
}

function LoginForm({onSwitch}: { onSwitch: () => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    console.log('📝 Tentando fazer login com:', { email });

    try {
      const response = await apiService.post<LoginResponse>('/user/login', {
        email,
        password,
      });

      console.log('✅ Login response:', response);

      if (response.status === 404) {
        return NotificationMessages.toasty.error('Falha ao realizar login, verifique suas credenciais e tente novamente.');
      }

      const token = response.data?.request?.token;
      if (!token) {
        return NotificationMessages.toasty.error('Falha ao realizar o login, tente novamente ou entre em contato um administrador.');
      }

      // Usa o contexto de autenticação para fazer login
      await login(token);

      await NotificationMessages.toasty.success('Login realizado com sucesso!');
      navigate(appRoutes.DASHBOARD.ROOT);
    } catch (err) {
      console.error('💥 Erro completo no login:', err);
      await NotificationMessages.toasty.error('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="E-mail"
          placeholder="seu@exemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Senha"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Group justify="space-between">
          <Anchor component="button" type="button" onClick={onSwitch}>
            Criar conta
          </Anchor>
          <Button type="submit" loading={loading}>Entrar</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default LoginForm;
