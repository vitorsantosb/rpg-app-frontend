import React, { useState } from 'react';
import { Button, Stack, TextInput, Textarea, NumberInput, Group } from '@mantine/core';
import { apiService } from '@/services/axios.service.ts';
import { NotificationMessages } from '@/components/notification/Notification.tsx';

interface CreateCampaignFormProps {
  onSuccess: (campaign: any) => void;
  onClose: () => void;
}

function CreateCampaignForm({ onSuccess, onClose }: CreateCampaignFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxPlayers, setMaxPlayers] = useState<number | ''>(6);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    // Validações básicas
    if (!name.trim()) {
      await NotificationMessages.error('O nome da campanha é obrigatório.');
      setLoading(false);
      return;
    }

    if (maxPlayers && (maxPlayers < 2 || maxPlayers > 20)) {
      await NotificationMessages.error('O número máximo de jogadores deve estar entre 2 e 20.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.post<{ campaign: any }>('/campaign/create', {
        name: name.trim(),
        description: description.trim() || undefined,
        maxPlayers: maxPlayers || 6,
      });

      if (response.status === 201 && response.data?.campaign) {
        await NotificationMessages.success('Campanha criada com sucesso!');
        onSuccess(response.data.campaign);
        setName('');
        setDescription('');
        setMaxPlayers(6);
        onClose();
      } else {
        await NotificationMessages.error('Erro ao criar campanha. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
      await NotificationMessages.error('Erro ao criar campanha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Nome da Campanha"
          placeholder="Ex: Aventura em Middle-earth"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={loading}
        />

        <Textarea
          label="Descrição"
          placeholder="Descreva sua campanha de RPG..."
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          disabled={loading}
          minRows={3}
          maxRows={6}
        />

        <NumberInput
          label="Máximo de Jogadores"
          placeholder="6"
          value={maxPlayers}
          onChange={(value) => setMaxPlayers(value)}
          min={2}
          max={20}
          disabled={loading}
          required
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Criar Campanha
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default CreateCampaignForm;

