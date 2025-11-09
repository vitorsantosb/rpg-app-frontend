import { appRoutes } from './routes.ts';
import { FiActivity } from 'react-icons/fi';
import { TfiPanel } from 'react-icons/tfi';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { IoTrendingUp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

export const sidebarTreeElements = [
  {
    label: 'Painel de Controle',
    icon: TfiPanel,
    item: [],
    description: 'Painel de Controle',
    url: `${appRoutes.DASHBOARD.ROOT}`
  },
  {
    label: 'Usuários',
    icon: FaUserFriends,
    item: [],
    description: 'Lista de usuários',
    url: `${appRoutes.DASHBOARD.USERS}`
  },
  {
    label: 'Analytics',
    icon: FiActivity,
    items: [],
    description: 'Dashboard Analitico',
    url: `${appRoutes.DASHBOARD.ROOT}/${appRoutes.DASHBOARD.ANALYTICS}`
  },
  {
    label: 'Gogo Command',
    icon: HiOutlineCommandLine,
    items: [],
    description: 'Shell Script',
    url: `${appRoutes.DASHBOARD.ROOT}/${appRoutes.DASHBOARD.GOGO_COMMAND}`
  },
  {
    label: 'Updates',
    icon: IoTrendingUp,
    items: [],
    description: 'Updates',
    url: `${appRoutes.DASHBOARD.ROOT}/${appRoutes.DASHBOARD.UPDATES}`
  }
]