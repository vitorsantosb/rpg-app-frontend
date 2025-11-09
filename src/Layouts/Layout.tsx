import {useEffect, useMemo, useState} from 'react';
import {Box, Flex, NavLink, ActionIcon, Avatar, Text} from '@mantine/core';
import {Outlet, useNavigate} from 'react-router-dom';
import {sidebarTreeElements} from '../models/sidebarTree.ts';
import {RiMenuFoldLine, RiMenuUnfoldLine, RiLogoutCircleLine} from 'react-icons/ri';
import {useMediaQuery} from '@mantine/hooks';

function Layout() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const [opened, setOpened] = useState(true);
  const [testVisible, setTestVisible] = useState(true);

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
        background:
          'radial-gradient(circle at 20% 20%, rgba(43,16,84,0.35), transparent 60%), ' +
          'radial-gradient(circle at 80% 0%, rgba(80,27,141,0.35), transparent 55%), ' +
          '#0f172a'
      }}
    >
      {/* Sidebar */}
      <Flex
        direction='column'
        justify='space-between'
        h='100%'
        style={{
          background: 'linear-gradient(180deg, #1B0C47 0%, #2D0B63 100%)',
          transition: 'width 0.5s'
        }}
        w={sidebarWidth}
        p={isDesktop ? 'sm' : 'md'}
        pos={isDesktop ? 'relative' : 'fixed'}
        top={0}
        left={0}
        mih="100vh"
      >
        {/* Header com logo e toggle */}
        <Flex w='100%' align='end' justify='end' mb='lg'>
          <Flex
            w={70}
            style={{
              transition: 'width 0.3s ease'
            }}
            justify={opened ? 'end' : 'center'}
            align={'center'}>
            <ActionIcon
              variant='subtle'
              onClick={handleToggle}
              color="white"
            >
              {opened ? <RiMenuFoldLine size={22}/> : <RiMenuUnfoldLine size={22}/>}
            </ActionIcon>
          </Flex>
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
                  color: 'rgba(226,232,240,0.72)',
                },
                label: {
                  transition: 'opacity 0.5s ease',
                  opacity: testVisible ? 1 : 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#f8fafc',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                },
                root: {
                  borderRadius: 12,
                  height: 54,
                  color: '#f8fafc',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 16px 30px rgba(0,0,0,0.25)',
                    backgroundColor: 'rgba(255,255,255,0.12)',
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
          <Avatar src="https://i.pravatar.cc/50" radius="xl"/>
          {testVisible && <Text c="white">Mr.Flufferson</Text>}
        </Flex>

        <NavLink
          label={testVisible ? 'Logout' : undefined}
          leftSection={<RiLogoutCircleLine size={20}/>}
          variant="light"
          style={{borderRadius: 8, color: 'white'}}
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
          background:
            'radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 45%), ' +
            'radial-gradient(circle at bottom right, rgba(148,163,184,0.15), transparent 50%)',
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
