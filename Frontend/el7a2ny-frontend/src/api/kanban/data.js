import { addDays, subDays } from 'date-fns';

const now = new Date();

const board = {
  members: [
    {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    {
      id: '5e887a62195cc5aef7e8ca5d',
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      name: 'Marcus Finn'
    },
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      name: 'Carson Darrin'
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/assets/avatars/avatar-fran-perez.png',
      name: 'Fran Perez'
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      name: 'Jie Yan Song'
    }
  ],
  columns: [
    {
      id: '5e849c39325dc5ef58e5a5db',
      taskIds: [
        '5e849c8708bd72683b454747',
        '5e849c90fabe1f1f4b3557f6',
        '5e849c977ef6265938bfd90b',
        '5e849c9e34ee93bc7255c599'
      ],
      name: 'Todo'
    },
    {
      id: '5e849c2b38d238c33e516755',
      taskIds: [
        '5e849ca7d063dc3830d4b49c',
        '5e849cb5d0c6e8894451fdfa'
      ],
      name: 'Progress'
    },
    {
      id: '5e849c2b38d238c33e5146755',
      taskIds: [],
      name: 'Done'
    }
  ],
  tasks: [
    {
      id: '5e849c8708bd72683b454747',
      assigneesIds: ['5e887a62195cc5aef7e8ca5d'],
      attachments: [
        {
          id: '7191325744eca06bc6ad2219',
          type: 'image',
          url: '/assets/covers/abstract-1-4x3-small.png'
        }
      ],
      authorId: '5e86809283e28b96d2d38537',
      checklists: [
        {
          id: '5e84a8175c48d3f5b1d01972',
          name: 'Update overview page',
          checkItems: [
            {
              id: '5e85af37da584c5e4bd8a06c',
              name: 'Prepare sketch',
              state: 'complete'
            }
          ]
        }
      ],
      comments: [
        {
          id: '15e849c5a35d4dff4f88ebff6',
          authorId: '5e887ac47eed253091be10cb',
          createdAt: subDays(now, 5).getTime(),
          message: 'This is a comment'
        }
      ],
      columnId: '5e849c39325dc5ef58e5a5db',
      description: 'Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.',
      due: addDays(now, 7).getTime(),
      isSubscribed: false,
      labels: ['Business', 'Design'],
      name: 'Call with sales of HubSpot'
    },
    {
      id: '5e849c90fabe1f1f4b3557f6',
      assigneesIds: ['5e887b209c28ac3dd97f6db5', '5e887a62195cc5aef7e8ca5d'],
      attachments: [],
      authorId: '5e887b209c28ac3dd97f6db5',
      checklists: [],
      columnId: '5e849c39325dc5ef58e5a5db',
      comments: [],
      description: 'We are looking for vue experience and of course node js strong knowledge',
      due: addDays(now, 6).getTime(),
      isSubscribed: true,
      labels: [],
      name: 'Interview for the Asis. Sales Manager'
    },
    {
      id: '5e849c977ef6265938bfd90b',
      assigneesIds: [],
      attachments: [],
      authorId: '5e887b7602bdbc4dbb234b27',
      checklists: [],
      columnId: '5e849c39325dc5ef58e5a5db',
      comments: [],
      description: 'We need to make it aggressive with pricing because it’s in their interest to acquire us',
      due: null,
      isSubscribed: false,
      labels: [],
      name: 'Change the height of the top bar because it looks too chunky'
    },
    {
      id: '5e849c9e34ee93bc7255c599',
      assigneesIds: ['5e887ac47eed253091be10cb', '5e86809283e28b96d2d38537'],
      attachments: [],
      authorId: '5e887a62195cc5aef7e8ca5d',
      checklists: [],
      columnId: '5e849c39325dc5ef58e5a5db',
      comments: [],
      description: 'We need to make it aggressive with pricing because it’s in their interest to acquire us',
      due: null,
      isSubscribed: false,
      labels: [],
      name: 'Integrate Stripe API'
    },
    {
      id: '5e849ca7d063dc3830d4b49c',
      assigneesIds: ['5e887a62195cc5aef7e8ca5d'],
      attachments: [],
      authorId: '5e887ac47eed253091be10cb',
      checklists: [],
      columnId: '5e849c2b38d238c33e516755',
      comments: [],
      description: 'We need to make it aggressive with pricing because it’s in their interest to acquire us',
      due: null,
      isSubscribed: true,
      labels: [],
      name: 'Update the customer API for payments'
    },
    {
      id: '5e849cb5d0c6e8894451fdfa',
      assigneesIds: [],
      attachments: [],
      authorId: '5e887ac47eed253091be10cb',
      checklists: [],
      columnId: '5e849c2b38d238c33e516755',
      comments: [],
      description: 'We need to make it aggressive with pricing because it’s in their interest to acquire us',
      due: null,
      isSubscribed: true,
      labels: [],
      name: 'Redesign the landing page'
    }
  ]
};

export const data = {
  board
};
