import { useEffect, useMemo, useState } from 'react';
import { Box, Flex, NavLink, ActionIcon, Avatar, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import { sidebarTreeElements } from '../models/sidebarTree.ts';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiLogoutCircleLine } from 'react-icons/ri';
import { useMediaQuery } from '@mantine/hooks';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import {appRoutes} from '@/models/routes.ts';
import { withAlpha } from '@/utils/withAlpha.utils.ts';
import { useAuth } from '@/contexts/AuthContext.tsx';

function Layout() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(true);
  const [testVisible, setTestVisible] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isDesktop) {
      setOpened(true);
      setTestVisible(true);
      return;
    }
    setOpened(false);
    setTestVisible(false);
  }, [isDesktop]);

  const sidebarWidth = useMemo(() => {
    if (!isDesktop) {
      return opened ? '80%' : 70;
    }
    return opened ? 260 : 76;
  }, [isDesktop, opened]);

  const sidebarBackground = useMemo(() => {
    if (colorScheme === 'dark') {
      return `linear-gradient(180deg, ${withAlpha(theme.colors.midnight?.[9], 0.92)}, ${withAlpha(theme.colors.midnight?.[7], 0.78)})`;
    }
    return `linear-gradient(180deg, ${withAlpha(theme.colors.brand?.[0], 0.85)}, ${withAlpha(theme.colors.brand?.[2], 0.75)})`;
  }, [colorScheme, theme]);

  const shellBackground = useMemo(() => {
    if (colorScheme === 'dark') {
      return `radial-gradient(circle at 20% 20%, ${withAlpha(theme.colors.brand?.[5], 0.18)}, transparent 58%), radial-gradient(circle at 80% 0%, ${withAlpha(theme.colors.aurora?.[5], 0.22)}, transparent 52%), ${theme.other?.surfaces?.dark ?? '#090f1c'}`;
    }
    return `radial-gradient(circle at 15% 15%, ${withAlpha(theme.colors.brand?.[1], 0.25)}, transparent 55%), radial-gradient(circle at 80% 10%, ${withAlpha(theme.colors.aurora?.[2], 0.25)}, transparent 55%), ${theme.other?.surfaces?.light ?? '#f5f7fb'}`;
  }, [colorScheme, theme]);

  const panelBorderColor =
    colorScheme === 'dark'
      ? theme.other?.borders?.dark ?? 'rgba(255,255,255,0.08)'
      : theme.other?.borders?.light ?? 'rgba(15,23,42,0.08)';

  const navLinkBackground = useMemo(() => {
    if (colorScheme === 'dark') {
      return withAlpha(theme.colors.midnight?.[8], 0.55);
    }
    return withAlpha(theme.colors.brand?.[0], 0.9);
  }, [colorScheme, theme.colors.brand, theme.colors.midnight]);

  const navLinkHoverBackground = useMemo(() => {
    if (colorScheme === 'dark') {
      return withAlpha(theme.colors.brand?.[5], 0.35);
    }
    return withAlpha(theme.colors.brand?.[3], 0.55);
  }, [colorScheme, theme.colors.brand, theme.colors.midnight]);

  const navLinkTextColor = colorScheme === 'dark' ? theme.white : theme.colors.midnight[9];
  const navLinkDescriptionColor =
    colorScheme === 'dark'
      ? withAlpha(theme.white, 0.62)
      : withAlpha(theme.colors.midnight?.[5], 0.85);

  function handleToggle() {
    if (!opened) {
      setTimeout(() => {
        setTestVisible((prev: boolean) => !prev);
      }, 300);
    } else {
      setTestVisible((prev: boolean) => !prev);
    }
    setOpened((prev: boolean) => !prev);
  }

  return (
    <Flex
      h='100%'
      w='100%'
      mih="100vh"
      style={{
        background: shellBackground,
        transition: 'background 200ms ease',
      }}
    >
      {/* Sidebar */}
      <Flex
        direction='column'
        justify='space-between'
        h='100%'
        style={{
          background: sidebarBackground,
          transition: 'width 0.5s, background 200ms ease',
          boxShadow:
            colorScheme === 'dark'
              ? '0 30px 60px rgba(6, 12, 22, 0.55)'
              : '0 24px 48px rgba(15, 23, 42, 0.18)',
        }}
        w={sidebarWidth}
        p={isDesktop ? 'sm' : 'md'}
        pos={isDesktop ? 'relative' : 'fixed'}
        top={0}
        left={0}
        mih="100vh"
      >
        {/* Header com logo e toggle */}
        <Flex
          w='100%'
          align='center'
          justify={opened ? 'space-between' : 'center'}
          mb='lg'
          direction={opened ? 'row' : 'column'}
          gap="sm"
        >
          <ActionIcon
            variant='subtle'
            onClick={handleToggle}
            color={colorScheme === 'dark' ? 'gray.1' : 'brand.6'}
            aria-label="Alternar largura do menu"
            size="lg"
          >
            {opened ? <RiMenuFoldLine size={22}/> : <RiMenuUnfoldLine size={22}/>}
          </ActionIcon>

          <ThemeToggle tooltipPosition={opened ? 'right' : 'bottom'} />
        </Flex>

        <Flex direction="column" gap="xs" flex={1}>
          {sidebarTreeElements.map((el) => (
            <NavLink
              key={el.label}
              active
              label={el.label}
              description={el.description} // sempre presente
              leftSection={<el.icon size={18} />}
              variant="light"
              onClick={() => navigate(el.url)}
              styles={{
                description: {
                  transition: 'opacity 0.5s ease',
                  opacity: testVisible ? 1 : 0,
                  overflow: 'hidden',
                  maxHeight: testVisible ? 200 : 0,
                  wordBreak: 'break-word',
                  color: navLinkDescriptionColor,
                },
                label: {
                  transition: 'opacity 0.5s ease',
                  opacity: testVisible ? 1 : 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: navLinkTextColor,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                },
                root: {
                  borderRadius: 12,
                  height: 54,
                  color: navLinkTextColor,
                  backgroundColor: navLinkBackground,
                  boxShadow:
                    colorScheme === 'dark'
                      ? '0 16px 35px rgba(3,7,18,0.55)'
                      : '0 14px 34px rgba(15,23,42,0.12)',
                  backdropFilter: 'blur(4px)',
                  border: `1px solid ${panelBorderColor}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow:
                      colorScheme === 'dark'
                        ? '0 20px 38px rgba(3,7,18,0.65)'
                        : '0 18px 38px rgba(15,23,42,0.16)',
                    backgroundColor: navLinkHoverBackground,
                  },
                },
              }}
            />
          ))}
        </Flex>

        {/* Footer com usuário */}
        <Flex
          direction={opened ? 'row' : 'column'}
          align="center"
          gap="sm"
          mt="auto"
          p="sm"
        >
          <Avatar 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || user?.email || 'User')}&background=random`} 
            radius="xl"
          />
          {testVisible && (
            <Text c={navLinkTextColor} fw={500}>
              {user?.username || user?.email || 'Usuário'}
            </Text>
          )}
        </Flex>

        <NavLink
          label={testVisible ? 'Logout' : undefined}
          leftSection={<RiLogoutCircleLine size={20}/>}
          variant="light"
          onClick={logout}
          styles={{
            root: {
              borderRadius: 10,
              color: navLinkTextColor,
              backgroundColor: navLinkBackground,
              border: `1px solid ${panelBorderColor}`,
            },
            label: { color: navLinkTextColor },
          }}
        />
      </Flex>

      {/* Conteúdo */}
      <Box
        component="main"
        flex={1}
        w="100%"
        px={{ base: 'md', lg: '2.5rem' }}
        py={{ base: 'lg', lg: '3rem' }}
        style={{
          marginLeft: isDesktop ? 0 : (opened ? '80%' : 70),
          transition: 'margin 0.3s ease',
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <Box
          w="100%"
          maw={1440}
          style={{
            minHeight: 'calc(100vh - 4rem)',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(148, 163, 184, 0.12)',
            overflow: 'hidden',
          }}
        >
          <Outlet/>
        </Box>
      </Box>
    </Flex>
  );
}

export default Layout;
