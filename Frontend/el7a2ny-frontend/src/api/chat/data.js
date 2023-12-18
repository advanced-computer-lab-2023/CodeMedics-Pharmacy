import { subDays, subHours, subMinutes } from 'date-fns';

const now = new Date();

export const contacts = [
  {
    id: '5e8891ab188cd2855e6029b7',
    avatar: '/assets/avatars/avatar-alcides-antonio.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Alcides Antonio'
  },
  {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/assets/avatars/avatar-marcus-finn.png',
    isActive: false,
    lastActivity: subHours(now, 2).getTime(),
    name: 'Marcus Finn'
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    isActive: false,
    lastActivity: subMinutes(now, 15).getTime(),
    name: 'Carson Darrin'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Fran Perez'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Jie Yan Song'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    isActive: false,
    lastActivity: subHours(now, 1).getTime(),
    name: 'Miron Vitold'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    isActive: false,
    lastActivity: subHours(now, 6).getTime(),
    name: 'Penjani Inyene'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Omar Darobe'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Siegbert Gottfried'
  },
  {
    id: '5e8877da9a65442b11551975',
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Iulia Albu'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Nasimiyu Danai'
  }
];

export const threads = [
  {
    id: '5e867eb9de721aecaccf4f7b',
    messages: [
      {
        id: '5e867f0a5bc0ff2bfa07bfa6',
        attachments: [],
        body: 'Hey, nice projects! I really liked the one in react. What\'s your quote on kinda similar project?',
        contentType: 'text',
        createdAt: subDays(subHours(now, 10), 4).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      },
      {
        id: '5e867f167d5f78109ae9f2a4',
        attachments: [],
        body: 'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
        contentType: 'text',
        createdAt: subDays(subHours(now, 2), 4).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '5e867f1c9ca72084693528f4',
        attachments: [],
        body: 'Well it\'s a really easy one, I\'m sure we can make it half of the price.',
        contentType: 'text',
        createdAt: subHours(now, 5).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      },
      {
        id: '5e867f22fd2e27a09849b4db',
        attachments: [],
        body: 'Then why don\'t you make it if it\'s that easy? Sorry I\'m not interetes, have fantastic day Adam!',
        contentType: 'text',
        createdAt: subHours(now, 3).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '5e867f28a34d45ac6eb5c41f',
        attachments: [],
        body: 'Last offer, $25 per hour',
        contentType: 'text',
        createdAt: subHours(now, 2).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      },
      {
        id: '5e867f2dba984a3f78b33526',
        attachments: [],
        body: '/assets/covers/minimal-1-4x3-small.png',
        contentType: 'image',
        createdAt: subHours(now, 1).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      }
    ],
    participantIds: [
      '5e86809283e28b96d2d38537',
      '5e86805e2bafd54f66cc95c3'
    ],
    type: 'ONE_TO_ONE',
    unreadCount: 2
  },
  {
    id: '5e867fa7082c3c5921403a26',
    messages: [
      {
        id: '5e867fc180837d901bd9bca1',
        attachments: [],
        body: 'Hey, would you like to collaborate?',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 6), 3).getTime(),
        authorId: '5e8680e60cba5019c5ca6fda'
      },
      {
        id: '5e8d6fb695df7971237fc173',
        attachments: [],
        body: 'Hi, Merrile!',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 5), 3).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '58825a290eb4d4271a54f188',
        attachments: [],
        body: 'Hello everyone 😀',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 2), 1).getTime(),
        authorId: '5e8891ab188cd2855e6029b7'
      }
    ],
    participantIds: [
      '5e86809283e28b96d2d38537',
      '5e8680e60cba5019c5ca6fda',
      '5e8891ab188cd2855e6029b7'
    ],
    type: 'GROUP',
    unreadCount: 0
  }
];
