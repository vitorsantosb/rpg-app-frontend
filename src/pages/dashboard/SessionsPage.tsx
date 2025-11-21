import { useState, useEffect } from 'react';
import { Flex, Text, Button, Card, Stack, Group, Badge } from "@mantine/core";
import { apiService } from '@/services/axios.service.ts';
import { NotificationMessages } from '@/components/notification/Notification.tsx';

interface Session {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'active' | 'finished';
}

function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  // Lista sessões ao carregar
  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    setLoadingList(true);
    try {
      // TODO: Ajustar endpoint quando backend estiver pronto
      const response = await apiService.get<{ sessions: Session[] }>('/session/list');
      if (response.data?.sessions) {
        setSessions(response.data.sessions);
      }
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      // Por enquanto, não mostra erro se o endpoint não existir
    } finally {
      setLoadingList(false);
    }
  }

  async function handleCreateSession() {
    setLoading(true);
    try {
      // TODO: Ajustar endpoint quando backend estiver pronto
      const response = await apiService.post<{ session: Session }>('/session/create', {
        name: `Sessão ${new Date().toLocaleString()}`,
      });

      if (response.data?.session) {
        setSessions(prev => [...prev, response.data.session]);
        await NotificationMessages.toasty.success('Sessão criada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      await NotificationMessages.toasty.error('Erro ao criar sessão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinSession(sessionId: string) {
    try {
      // TODO: Ajustar endpoint quando backend estiver pronto
      await apiService.post(`/session/${sessionId}/join`);
      await NotificationMessages.toasty.success('Entrou na sessão!');
      // Aqui você pode navegar para a página da sessão ou usar WebSocket para eventos em tempo real
    } catch (error) {
      console.error('Erro ao entrar na sessão:', error);
      await NotificationMessages.toasty.error('Erro ao entrar na sessão. Tente novamente.');
    }
  }

  return (
    <Stack p="md" gap="md">
      <Flex justify="space-between" align="center">
        <Text size="lg" fw={700}>Sessões</Text>
        <Button onClick={handleCreateSession} loading={loading}>
          Nova Campanha
        </Button>
      </Flex>

      {loadingList ? (
        <Card p="xl" ta="center">
          <Text c="dimmed">Carregando sessões...</Text>
        </Card>
      ) : sessions.length === 0 ? (
        <Card p="xl" ta="center">
          <Text c="dimmed">Nenhuma sessão disponível</Text>
        </Card>
      ) : (
        <Stack gap="sm">
          {sessions.map((session) => (
            <Card key={session.id} p="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={600}>{session.name}</Text>
                  <Text size="sm" c="dimmed">
                    {session.players}/{session.maxPlayers} jogadores
                  </Text>
                </div>
                <Group>
                  <Badge
                    color={
                      session.status === 'active'
                        ? 'green'
                        : session.status === 'waiting'
                        ? 'yellow'
                        : 'gray'
                    }
                  >
                    {session.status}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleJoinSession(session.id)}
                    disabled={session.status !== 'waiting'}
                  >
                    Entrar
                  </Button>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default SessionsPage;

