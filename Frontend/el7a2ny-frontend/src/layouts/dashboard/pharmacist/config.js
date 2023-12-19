import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/solid/ChatBubbleLeftRightIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MessageChatSquareIcon from '../../../icons/untitled-ui/duocolor/message-chat-square';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SettingsIcon from '@mui/icons-material/Settings';

export const items = [
  {
    title: 'Overview',
    path: '/pharmacist/performance',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Orders',
    path: '/pharmacist/orders',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'Medicines',
    path: '/pharmacist/medicines',
    icon: (
      <SvgIcon fontSize="small">
        <MedicalServicesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Chat',
    path: '/pharmacist/chat',
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleLeftRightIcon   />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/pharmacist/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/pharmacist/settings',
    icon: (
      <SvgIcon fontSize="small">
        <SettingsIcon />
      </SvgIcon>
    )
  }
];
