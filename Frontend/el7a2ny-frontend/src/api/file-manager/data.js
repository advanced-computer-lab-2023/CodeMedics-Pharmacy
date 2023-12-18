import { subDays, subHours, subMinutes } from 'date-fns';

const now = new Date();

export const items = [
  {
    id: '719a07ce8e46dee2388d411c',
    author: {
      avatar: '/assets/avatars/avatar-alcides-antonio.png',
      name: 'Alcides Antonio'
    },
    createdAt: subMinutes(now, 15).getTime(),
    isFavorite: false,
    isPublic: false,
    items: [],
    itemsCount: 12,
    name: 'AWS Credentials',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      },
      {
        avatar: '/assets/avatars/avatar-miron-vitold.png',
        name: 'Miron Vitold'
      }
    ],
    size: 528381242,
    tags: ['Business', 'Work', 'Homework', 'Cats', 'Holiday', 'Friends'],
    type: 'folder',
    updatedAt: null
  },
  {
    id: 'ed41ba8be80fac27d08efe3a',
    author: {
      avatar: '/assets/avatars/avatar-fran-perez.png',
      name: 'Fran Perez'
    },
    createdAt: subMinutes(now, 23).getTime(),
    isFavorite: true,
    isPublic: true,
    items: [],
    itemsCount: 5,
    name: 'dev 2022',
    shared: [],
    size: 519090127,
    tags: ['Friends', 'Business', 'Homework', 'Personal'],
    type: 'folder',
    updatedAt: subMinutes(now, 2).getTime()
  },
  {
    id: 'b8bb82b90aedf81d57ccdb4d',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subHours(subMinutes(now, 3), 4).getTime(),
    isFavorite: false,
    isPublic: false,
    items: [],
    itemsCount: 3,
    name: 'AI Resources',
    shared: [
      {
        avatar: '/assets/avatars/avatar-miron-vitold.png',
        name: 'Miron Vitold'
      },
      {
        avatar: '/assets/avatars/avatar-alcides-antonio.png',
        name: 'Alcides Antonio'
      },
      {
        avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
        name: 'Nasimiyu Danai'
      }
    ],
    size: 194220900,
    tags: [
      'Homework',
      'Holiday',
      'Important',
      'Work',
      'Friends',
      'Personal'
    ],
    type: 'folder',
    updatedAt: null
  },
  {
    id: 'b33fe3f9ced7e4fa7efcbd9a',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subHours(subMinutes(now, 16), 20).getTime(),
    isFavorite: true,
    isPublic: false,
    itemsCount: 17,
    name: 'invoices',
    shared: [],
    size: 731214568,
    tags: ['Personal', 'Important', 'Invoices'],
    type: 'folder',
    updatedAt: null
  },
  {
    id: 'dffb38de19c7e9ce0dc690cf',
    author: {
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      name: 'Carson Darrin'
    },
    createdAt: subHours(subMinutes(now, 23), 26).getTime(),
    isFavorite: true,
    isPublic: true,
    items: [],
    itemsCount: 12,
    name: 'assets',
    shared: [],
    size: 103885109,
    tags: ['Invoices', 'Personal', 'Holiday', 'Homework', 'Cats', 'Work'],
    type: 'folder',
    updatedAt: null
  },
  {
    id: 'c23e85a978a79a5cb53c0b0a',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'pdf',
    isFavorite: true,
    isPublic: false,
    name: 'Personal-cv.pdf',
    shared: [
      {
        avatar: '/assets/avatars/avatar-alcides-antonio.png',
        name: 'Alcides Antonio'
      }
    ],
    size: 472262466,
    tags: ['Invoices', 'Work'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'b3acfe9aa417c1f9e1cda220',
    author: {
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      name: 'Siegbert Gottfried'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'svg',
    isFavorite: true,
    isPublic: false,
    name: 'company-logo-white.svg',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      },
      {
        avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
        name: 'Nasimiyu Danai'
      }
    ],
    size: 762152011,
    tags: ['Homework'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'afa0412fe4cdb39b3c8b9ad2',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'jpeg',
    isFavorite: true,
    isPublic: false,
    name: 'landing_cover1.jpeg',
    shared: [
      {
        avatar: '/assets/avatars/avatar-iulia-albu.png',
        name: 'Iulia Albu'
      }
    ],
    size: 746826456,
    tags: [
      'Important',
      'Personal',
      'Invoices',
      'Homework',
      'Business',
      'Cats',
      'Holiday'
    ],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'f90e02aaa5f7f9f87ae14ad8',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'svg',
    isFavorite: false,
    isPublic: false,
    name: 'About-Hero_shape-xl.svg',
    shared: [
      {
        avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
        name: 'Nasimiyu Danai'
      },
      {
        avatar: '/assets/avatars/avatar-iulia-albu.png',
        name: 'Iulia Albu'
      }
    ],
    size: 374404524,
    tags: [],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'b74e2b767d284d4a94de5e3a',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'log',
    isFavorite: true,
    isPublic: false,
    name: 'api-out.log',
    shared: [],
    size: 54765975,
    tags: ['Cats'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'b929bf2753254c05d45bc9fa',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 41), 6), 2).getTime(),
    extension: 'ico',
    isFavorite: true,
    isPublic: false,
    name: 'investor_optical_tactics.ico',
    shared: [
      {
        avatar: '/assets/avatars/avatar-carson-darrin.png',
        name: 'Carson Darrin'
      }
    ],
    size: 674580489,
    tags: ['Homework', 'Cats', 'Business', 'Personal', 'Friends'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'fdbadfb4cbbd5b3ea44b1823',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 3), 14), 6).getTime(),
    extension: 'dmg',
    isFavorite: true,
    isPublic: false,
    name: 'rustic_driver_pike.dmg',
    shared: [
      {
        avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
        name: 'Siegbert Gottfried'
      },
      {
        avatar: '/assets/avatars/avatar-carson-darrin.png',
        name: 'Carson Darrin'
      }
    ],
    size: 211681809,
    tags: ['Work', 'Personal', 'Invoices', 'Homework'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'edc8f7a0420fef23bfeaafed',
    author: {
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      name: 'Siegbert Gottfried'
    },
    createdAt: subDays(subHours(subMinutes(now, 21), 4), 9).getTime(),
    extension: '7z',
    isFavorite: false,
    isPublic: false,
    name: 'strategist-auto_royce.7z',
    shared: [],
    size: 928256606,
    tags: [],
    type: 'file',
    updatedAt: null
  },
  {
    id: '28becedd58a2fb7be2d05cf5',
    author: {
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      name: 'Marcus Finn'
    },
    createdAt: subDays(subHours(subMinutes(now, 45), 11), 9).getTime(),
    extension: 'msi',
    isFavorite: false,
    isPublic: true,
    name: 'Graphic Driver 1.11.msi',
    shared: [],
    size: 436081098,
    tags: [
      'Homework',
      'Holiday',
      'Cats',
      'Invoices',
      'Important',
      'Work',
      'Friends'
    ],
    type: 'file',
    updatedAt: null
  },
  {
    id: '5affd9c3af627afb1fdc7657',
    author: {
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      name: 'Marcus Finn'
    },
    createdAt: subDays(subHours(subMinutes(now, 23), 3), 10).getTime(),
    extension: 'svg',
    isFavorite: false,
    isPublic: true,
    name: 'icon-arrow-right.svg',
    shared: [],
    size: 6273,
    tags: ['Personal'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '3bc08f0082b7dd2bd52fee6e',
    author: {
      avatar: '/assets/avatars/avatar-omar-darboe.png',
      name: 'Omar Darobe'
    },
    createdAt: subDays(subHours(subMinutes(now, 4), 2), 11).getTime(),
    extension: 'rar',
    isFavorite: false,
    isPublic: false,
    name: 'animation-ai-model.py',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      }
    ],
    size: 785187212,
    tags: ['Work', 'Cats', 'Invoices'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '100bcfa1faeba4c36c7b5ad3',
    author: {
      avatar: '/assets/avatars/avatar-penjani-inyene.png',
      name: 'Penjani Inyene'
    },
    createdAt: subDays(subHours(subMinutes(now, 31), 6), 11).getTime(),
    extension: 'png',
    isFavorite: true,
    isPublic: false,
    name: 'hybrid_vw-2023.png',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      }
    ],
    size: 442600692,
    tags: [
      'Important',
      'Business',
      'Holiday',
      'Friends',
      'Invoices',
      'Personal'
    ],
    type: 'file',
    updatedAt: null
  },
  {
    id: '6e638cfc6ab9bd1c78a28f73',
    author: {
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      name: 'Jie Yan Song'
    },
    createdAt: subDays(subHours(subMinutes(now, 11), 12), 11).getTime(),
    extension: 'png',
    isFavorite: true,
    isPublic: true,
    name: 'diesel_electric.png',
    shared: [],
    size: 363777187,
    tags: ['Important', 'Homework'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '45fb900df5e07ac0c5aeedfa',
    author: {
      avatar: '/assets/avatars/avatar-alcides-antonio.png',
      name: 'Alcides Antonio'
    },
    createdAt: subDays(subHours(subMinutes(now, 4), 15), 15).getTime(),
    extension: 'mp4',
    isFavorite: false,
    isPublic: false,
    name: 'christmas carols.mp4',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      }
    ],
    size: 841133109,
    tags: ['Personal', 'Important', 'Invoices'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '5e9b61b7caec888a9fb53fa5',
    author: {
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      name: 'Siegbert Gottfried'
    },
    createdAt: subDays(subHours(subMinutes(now, 31), 5), 17).getTime(),
    extension: 'dmg',
    isFavorite: false,
    isPublic: false,
    name: 'Bandwidth_traffic-analyzer.dmg',
    shared: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser'
      }
    ],
    size: 258621281,
    tags: ['Homework', 'Work', 'Personal', 'Important'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'ec4754671acbd7ad74afffa6',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 11), 16), 18).getTime(),
    extension: 'pkg',
    isFavorite: true,
    isPublic: false,
    name: 'devias-kit.fig',
    shared: [
      {
        avatar: '/assets/avatars/avatar-neha-punita.png',
        name: 'Neha Punita'
      }
    ],
    size: 528228820,
    tags: ['Work', 'Holiday', 'Friends'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '97c43cc1e0ad50cbbf14b6ce',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 1), 3), 37).getTime(),
    extension: 'exe',
    isFavorite: true,
    isPublic: false,
    name: 'not_a_virus.exe',
    shared: [
      {
        avatar: '/assets/avatars/avatar-cao-yu.png',
        name: 'Cao Yu'
      },
      {
        avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
        name: 'Siegbert Gottfried'
      }
    ],
    size: 600779531,
    tags: ['Important', 'Friends'],
    type: 'file',
    updatedAt: null
  },
  {
    id: '7cfdb3fed0bac18d77b555ba',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 12), 11), 40).getTime(),
    extension: 'psd',
    isFavorite: true,
    isPublic: false,
    name: 'website-hero-illustration.psd',
    shared: [
      {
        avatar: '/assets/avatars/avatar-cao-yu.png',
        name: 'Cao Yu'
      }
    ],
    size: 333130679,
    tags: ['Cats', 'Personal', 'Work', 'Important', 'Friends'],
    type: 'file',
    updatedAt: null
  },
  {
    id: 'e23ee9ae093bb6e25cce9f85',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 15), 23), 41).getTime(),
    extension: 'tar',
    isFavorite: true,
    isPublic: false,
    name: 'ssl-certs.tar',
    shared: [
      {
        avatar: '/assets/avatars/avatar-neha-punita.png',
        name: 'Neha Punita'
      }
    ],
    size: 516488635,
    tags: [
      'Cats',
      'Friends',
      'Important',
      'Homework',
      'Work',
      'Personal',
      'Business'
    ],
    type: 'file',
    updatedAt: null
  },
  {
    id: '22fae356b5b7c5d13c4b4ba8',
    author: {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    createdAt: subDays(subHours(subMinutes(now, 40), 11), 62).getTime(),
    extension: 'deb',
    isFavorite: true,
    isPublic: false,
    name: 'tablet-driver-adapter.deb',
    shared: [],
    size: 761277264,
    tags: ['Cats', 'Homework', 'Business', 'Personal'],
    type: 'file',
    updatedAt: null
  }
];
