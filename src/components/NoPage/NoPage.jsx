import React from "react";
import { Title, Text, Button, Group, Center, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {userRoutes} from '@/models/routes.ts';

function NoPage() {
  const navigate = useNavigate();

  return (
    <Center w="100%" h="100%">
      <Stack align="center" gap="md" maw={600} ta="center" px="md">
        <Title order={1} size={100} fw={900} c="dimmed">
          404
        </Title>

        <Title order={2}>Página não encontrada</Title>

        <Text c="dimmed" size="lg">
          A página que você está tentando acessar não existe ou foi removida.
          Verifique o endereço ou volte para a página inicial.
        </Text>

        <Group justify="center" mt="md">
          <Button size="md" onClick={() => navigate(userRoutes.HOMEPAGE)}>
            Voltar para Home
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}

export default NoPage;
