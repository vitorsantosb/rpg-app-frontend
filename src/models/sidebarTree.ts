import {adminRoutes} from './routes.ts';
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
    url: `${adminRoutes.DASHBOARD.HOME}`
  },
  {
    label: 'Usuários',
    icon: FaUserFriends,
    item: [],
    description: 'Lista de usuários',
    url: `${adminRoutes.DASHBOARD.USERS}`
  },
  {
    label: 'Analytics',
    icon: FiActivity,
    items: [],
    description: 'Dashboard Analitico',
    url: `${adminRoutes.DASHBOARD.HOME}/${adminRoutes.DASHBOARD.ANALYTICS}`
  },
  {
    label: 'Gogo Command',
    icon: HiOutlineCommandLine,
    items: [],
    description: 'Shell Script',
    url: `${adminRoutes.DASHBOARD.HOME}/${adminRoutes.DASHBOARD.GOGO_SHELL}`
  },
  {
    label: 'Updates',
    icon: IoTrendingUp,
    items: [],
    description: 'Updates',
    url: `${adminRoutes.DASHBOARD.HOME}/${adminRoutes.DASHBOARD.UPDATES}`
  }
]