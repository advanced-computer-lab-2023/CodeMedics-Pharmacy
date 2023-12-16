import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MapIcon from '@heroicons/react/24/solid/MapIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import MessageChatSquareIcon from '../../../icons/untitled-ui/duocolor/message-chat-square';


export const items = [
  {
    title: 'Medicines',
    path: '/user/medicines',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Cart',
    path: '/user/myCart',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Orders',
    path: '/user/orders',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Addresses',
    path: '/user/address',
    icon: (
      <SvgIcon fontSize="small">
        <MapIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Chat',
    path: '/user/chat',
    icon: (
      <SvgIcon fontSize="small">
        <MessageChatSquareIcon   />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/user/account',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/user/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];
