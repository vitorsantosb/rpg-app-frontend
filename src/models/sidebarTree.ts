import { appRoutes } from './routes.ts';
import { TfiPanel } from 'react-icons/tfi';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { IoTrendingUp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { GiScrollUnfurled } from "react-icons/gi";
import {MdGroups2} from 'react-icons/md';


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
    label: 'Campanhas',
    icon: GiScrollUnfurled,
    items: [],
    description: 'Minhas campanhas',
    url: `${appRoutes.DASHBOARD.ROOT}/${appRoutes.DASHBOARD.CAMPAIGNS}`
  },
  {
    label: 'Sessões',
    icon: MdGroups2,
    items: [],
    description: 'Minhas sessões',
    url: `${appRoutes.DASHBOARD.ROOT}/${appRoutes.DASHBOARD.SESSIONS}`
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
