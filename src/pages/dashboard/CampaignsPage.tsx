import { useState, useEffect } from 'react';
import { Flex, Text, Button, Card, Stack, Group, Badge, Modal, Box, Title, Loader, Center, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { apiService } from '@/services/axios.service.ts';
import { NotificationMessages } from '@/components/notification/Notification.tsx';
import { Campaign } from '@/models/campaign/campaign.models.ts';
import CreateCampaignForm from '@/components/CampaignPage/CreateCampaignForm.tsx';
import { GiScrollUnfurled } from "react-icons/gi";
import { MdGroups, MdPlayArrow, MdExitToApp } from "react-icons/md";
import { withAlpha } from '@/utils/withAlpha.utils.ts';

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [opened, setOpened] = useState(false);

  // Lista campanhas ao carregar
  useEffect(() => {
    loadCampaigns();
  }, []);

  function mapCampaign(backendCampaign: any): Campaign {
    return {
      id: backendCampaign._id?.toString() || '',
      name: backendCampaign._name || '',
      description: backendCampaign._description,
      masterId: backendCampaign._master_id?.toString() || '',
      players: backendCampaign._players?.length || 0,
      maxPlayers: backendCampaign._maxPlayers || 6,
      status: backendCampaign._status || 'active',
    };
  }

  async function loadCampaigns() {
    setLoadingList(true);
    try {
      const response = await apiService.get<{ campaigns: any[] }>('/campaign/list');
      if (response.data?.campaigns) {
        const mappedCampaigns = response.data.campaigns.map(mapCampaign);
        setCampaigns(mappedCampaigns);
      }
    } catch (error) {
      console.error('Erro ao carregar campanhas:', error);
      await NotificationMessages.toasty.error('Erro ao carregar campanhas. Tente novamente.');
    } finally {
      setLoadingList(false);
    }
  }

  function handleCampaignCreated(backendCampaign: any) {
    const mappedCampaign = mapCampaign(backendCampaign);
    setCampaigns(prev => [...prev, mappedCampaign]);
  }

  async function handleJoinCampaign(campaignId: string) {
    try {
      // TODO: Ajustar endpoint quando backend estiver pronto
      await apiService.post(`/campaign/${campaignId}/join`);
      await NotificationMessages.toasty.success('Entrou na campanha!');
      // Recarrega a lista de campanhas
      await loadCampaigns();
    } catch (error) {
      console.error('Erro ao entrar na campanha:', error);
      await NotificationMessages.toasty.error('Erro ao entrar na campanha. Tente novamente.');
    }
  }

  async function handleLeaveCampaign(campaignId: string) {
    try {
      // TODO: Ajustar endpoint quando backend estiver pronto
      await apiService.post(`/campaign/${campaignId}/leave`);
      await NotificationMessages.toasty.success('Saiu da campanha!');
      // Recarrega a lista de campanhas
      await loadCampaigns();
    } catch (error) {
      console.error('Erro ao sair da campanha:', error);
      await NotificationMessages.toasty.error('Erro ao sair da campanha. Tente novamente.');
    }
  }

  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const cardBackground = colorScheme === 'dark'
    ? theme.other?.panels?.dark ?? 'rgba(9, 19, 35, 0.85)'
    : theme.other?.panels?.light ?? '#ffffff';

  const borderColor = colorScheme === 'dark'
    ? theme.other?.borders?.dark ?? 'rgba(255, 255, 255, 0.08)'
    : theme.other?.borders?.light ?? 'rgba(15, 23, 42, 0.08)';

  const textColor = colorScheme === 'dark'
    ? theme.colors.midnight?.[0] ?? '#f8fafc'
    : theme.colors.midnight?.[9] ?? '#1c2b3f';

  const dimmedTextColor = colorScheme === 'dark'
    ? theme.colors.midnight?.[2] ?? '#d5dceb'
    : theme.colors.midnight?.[6] ?? '#6a89b5';

  return (
    <>
      <Stack p="lg" gap="lg">
        <Flex justify="space-between" align="center" mb="xs">
          <Group gap="sm">
            <GiScrollUnfurled size={28} style={{ color: theme.colors.brand?.[5] }} />
            <Title order={2} c={textColor}>
              Campanhas
            </Title>
          </Group>
          <Button
            onClick={() => setOpened(true)}
            leftSection={<GiScrollUnfurled size={18} />}
            size="md"
          >
            Nova Campanha
          </Button>
        </Flex>

        {loadingList ? (
          <Card p="xl" ta="center" style={{ border: `1px solid ${borderColor}` }}>
            <Center>
              <Stack gap="md" align="center">
                <Loader size="lg" />
                <Text c={dimmedTextColor}>Carregando campanhas...</Text>
              </Stack>
            </Center>
          </Card>
        ) : campaigns.length === 0 ? (
          <Card p="xl" ta="center" style={{ border: `1px solid ${borderColor}` }}>
            <Stack gap="md" align="center">
              <GiScrollUnfurled size={64} style={{ color: dimmedTextColor, opacity: 0.5 }} />
              <Text c={dimmedTextColor} size="lg">Nenhuma campanha disponível</Text>
              <Text c={dimmedTextColor} size="sm">Crie sua primeira campanha para começar</Text>
              <Button
                onClick={() => setOpened(true)}
                leftSection={<GiScrollUnfurled size={18} />}
                mt="md"
              >
                Criar Primeira Campanha
              </Button>
            </Stack>
          </Card>
        ) : (
          <Stack gap="md">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                p="lg"
                withBorder
                style={{
                  border: `1px solid ${borderColor}`,
                  backgroundColor: cardBackground,
                  backdropFilter: 'blur(18px)',
                  transition: 'transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                  e.currentTarget.style.borderColor = withAlpha(theme.colors.brand?.[5] ?? '#4e6ffc', 0.3);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.xs;
                  e.currentTarget.style.borderColor = borderColor;
                }}
              >
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group gap="xs" mb="xs" align="center">
                      <GiScrollUnfurled size={20} style={{ color: theme.colors.brand?.[5] }} />
                      <Text
                        fw={700}
                        size="lg"
                        c={textColor}
                        style={{ lineHeight: 1.2 }}
                        truncate
                      >
                        {campaign.name}
                      </Text>
                      <Badge
                        size="sm"
                        variant="light"
                        color={
                          campaign.status === 'active'
                            ? 'green'
                            : campaign.status === 'paused'
                            ? 'yellow'
                            : 'gray'
                        }
                        radius="md"
                      >
                        {campaign.status === 'active' ? 'Ativa' : campaign.status === 'paused' ? 'Pausada' : 'Finalizada'}
                      </Badge>
                    </Group>

                    {campaign.description && (
                      <Text
                        size="sm"
                        c={dimmedTextColor}
                        mb="sm"
                        style={{ lineHeight: 1.6 }}
                        lineClamp={2}
                      >
                        {campaign.description}
                      </Text>
                    )}

                    <Group gap="md" mt="xs">
                      <Group gap={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <MdGroups size={16} style={{ color: dimmedTextColor }} />
                        <Text size="sm" c={dimmedTextColor} fw={500}>
                          {campaign.players}/{campaign.maxPlayers} jogadores
                        </Text>
                      </Group>
                    </Group>
                  </Box>

                  <Group gap="sm" ml="md" wrap="nowrap">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinCampaign(campaign.id);
                      }}
                      disabled={campaign.status !== 'active'}
                      leftSection={<MdPlayArrow size={18} />}
                      style={{
                        opacity: campaign.status !== 'active' ? 0.5 : 1,
                      }}
                    >
                      Entrar
                    </Button>
                    <Button
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeaveCampaign(campaign.id);
                      }}
                      leftSection={<MdExitToApp size={18} />}
                    >
                      Sair
                    </Button>
                  </Group>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Criar Nova Campanha"
        centered
      >
        <CreateCampaignForm
          onSuccess={handleCampaignCreated}
          onClose={() => setOpened(false)}
        />
      </Modal>
    </>
  );
}

export default CampaignsPage;

