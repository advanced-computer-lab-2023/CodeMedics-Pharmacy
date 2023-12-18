const now = new Date();

export const labels = [
  {
    id: 'all',
    name: 'All Mail',
    type: 'system'
  },
  {
    id: 'inbox',
    name: 'Inbox',
    totalCount: 0,
    type: 'system',
    unreadCount: 1
  },
  {
    id: 'sent',
    name: 'Sent',
    totalCount: 0,
    type: 'system',
    unreadCount: 0
  },
  {
    id: 'drafts',
    name: 'Drafts',
    totalCount: 0,
    type: 'system',
    unreadCount: 0
  },
  {
    id: 'trash',
    name: 'Trash',
    totalCount: 1,
    type: 'system',
    unreadCount: 0
  },
  {
    id: 'spam',
    name: 'Spam',
    totalCount: 0,
    type: 'system',
    unreadCount: 0
  },
  {
    id: 'important',
    name: 'Important',
    totalCount: 1,
    type: 'system',
    unreadCount: 0
  },
  {
    id: 'starred',
    name: 'Starred',
    totalCount: 1,
    type: 'system',
    unreadCount: 1
  },
  {
    id: 'work',
    color: '#43A048',
    name: 'Work',
    totalCount: 1,
    type: 'custom',
    unreadCount: 0
  },
  {
    id: 'business',
    color: '#1E88E5',
    name: 'Business',
    totalCount: 2,
    type: 'custom',
    unreadCount: 1
  },
  {
    id: 'personal',
    color: '#FB8A00',
    name: 'Personal',
    totalCount: 1,
    type: 'custom',
    unreadCount: 0
  }
];

export const emails = [
  {
    id: '5e86bcc3e1b53b6365d71638',
    attachments: [
      {
        id: '945d887e97f480359d3f591f',
        name: 'working-sketch.png',
        size: '128.5Kb',
        type: 'image',
        url: '/assets/covers/abstract-1-4x4-small.png'
      },
      {
        id: '09223c93e60f815fdce487af',
        name: 'summer-customers.pdf',
        size: '782.3Kb',
        type: 'file',
        url: '#'
      },
      {
        id: '165adb24c7b6a2e9aebba766',
        name: 'desktop-coffee.png',
        size: '568.2Kb',
        type: 'image',
        url: '/assets/covers/minimal-1-4x4-small.png'
      }
    ],
    createdAt: now.getTime(),
    folder: 'inbox',
    from: {
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      email: 'marcus.finn@devias.io',
      name: 'Marcus Finn'
    },
    isImportant: true,
    isStarred: false,
    isUnread: true,
    labelIds: ['work', 'business'],
    message: `
Hi Matt, I saw your work on instagram and would be interested in getting a quote for Logo and slider

Integer velit massa, pharetra sed lacus eu, pulvinar faucibus ex. Ut pretium ex id turpis elementum, aliquam accumsan enim sollicitudin. Sed nec consectetur lorem, ac ullamcorper augue. Suspendisse tempus ligula suscipit finibus vehicula. Morbi viverra finibus lectus, egestas dictum mi mollis nec. Proin eget vehicula eros, sit amet molestie ipsum. Morbi feugiat, elit non placerat fringilla, leo risus tristique felis, sollicitudin tristique nibh arcu nec arcu. Maecenas vel turpis nibh. Etiam in lectus quis felis facilisis dictum. Morbi id vehicula lectus, vel imperdiet dolor. Phasellus consequat tempor tellus, quis placerat quam posuere eget. Mauris blandit, nisl eu sollicitudin tincidunt, tellus diam accumsan arcu, vel pharetra lectus est nec nisi. In sem dolor, mollis sed risus eu, mattis dictum lectus. Suspendisse urna est, finibus et urna non, tincidunt placerat eros.

Donec viverra ipsum id auctor rutrum. Morbi consequat a nunc non interdum. Nulla accumsan eget felis a dictum. Cras rhoncus tortor eget velit fringilla suscipit. Donec quis arcu eu nibh aliquet auctor eget fringilla felis. Sed commodo efficitur massa. Proin maximus elit in suscipit laoreet. Integer pretium arcu ac mauris ullamcorper auctor. Vivamus tincidunt lacus eget purus feugiat tincidunt. Etiam feugiat gravida ullamcorper. Pellentesque cursus vehicula lectus et consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ligula risus, congue eu pellentesque id, volutpat aliquam arcu. Donec efficitur ipsum id neque rhoncus viverra. Vestibulum hendrerit et eros eu bibendum.


Kind regards,

Marcus Finn
    `,
    subject: 'Website redesign. Interested in collaboration',
    to: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        email: 'anika.visser@devias.io',
        name: 'Anika Visser'
      }
    ]
  },
  {
    id: '5e86bcbd8406cd3055f2b6c8',
    createdAt: now.getTime(),
    folder: 'spam',
    from: {
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      email: 'miron.vitold@devias.io',
      name: 'Miron Vitold'
    },
    isImportant: false,
    isStarred: true,
    isUnread: false,
    labelIds: [],
    message: `
Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?
    `,
    subject: 'Amazing work',
    to: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        email: 'anika.visser@devias.io',
        name: 'Anika Visser'
      }
    ]
  },
  {
    id: '5e86bcb9fee1ec12453fa13b',
    createdAt: now.getTime(),
    folder: 'inbox',
    from: {
      avatar: '/assets/avatars/avatar-penjani-inyene.png',
      email: 'penjani.inyene@devias.io',
      name: 'Penjani Inyene'
    },
    isImportant: false,
    isStarred: false,
    isUnread: false,
    labelIds: ['business'],
    message: `
Dear Anika, Your flight is coming up soon. Please don’t forget to check in for your scheduled flight.
    `,
    subject: 'Flight reminder',
    to: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        email: 'anika.visser@devias.io',
        name: 'Anika Visser'
      }
    ]
  },
  {
    id: '5e86bcb5575181a5e527e24f',
    createdAt: now.getTime(),
    folder: 'trash',
    from: {
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      email: 'carson.darrin@devias.io',
      name: 'Carson Darrin'
    },
    isImportant: false,
    isStarred: false,
    isUnread: true,
    labelIds: ['personal'],
    message: `
My market leading client has another fantastic opportunity for an experienced Software Developer to join them on a heavily remote basis
    `,
    subject: 'Possible candidates for the position',
    to: [
      {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        email: 'anika.visser@devias.io',
        name: 'Anika Visser'
      }
    ]
  }
];
