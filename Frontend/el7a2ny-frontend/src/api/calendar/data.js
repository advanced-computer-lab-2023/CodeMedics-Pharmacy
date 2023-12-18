import { addDays, endOfDay, setHours, setMinutes, startOfDay, subDays } from 'date-fns';

const now = new Date();

const events = [
  {
    id: '5e8882e440f6322fa399eeb8',
    allDay: false,
    description: 'Inform about new contract',
    end: setHours(setMinutes(subDays(now, 6), 0), 19).getTime(),
    start: setHours(setMinutes(subDays(now, 6), 30), 17).getTime(),
    title: 'Call Samantha'
  },
  {
    id: '5e8882eb5f8ec686220ff131',
    allDay: false,
    description: 'Discuss about new partnership',
    end: setHours(setMinutes(addDays(now, 2), 30), 15).getTime(),
    start: setHours(setMinutes(addDays(now, 2), 0), 12).getTime(),
    title: 'Meet with IBM'
  },
  {
    id: '5e8882f1f0c9216396e05a9b',
    allDay: false,
    description: 'Prepare docs',
    end: setHours(setMinutes(addDays(now, 5), 0), 12).getTime(),
    start: setHours(setMinutes(addDays(now, 5), 0), 8).getTime(),
    title: 'SCRUM Planning'
  },
  {
    id: '5e8882f6daf81eccfa40dee2',
    allDay: true,
    description: 'Meet with team to discuss',
    end: startOfDay(subDays(now, 11)).getTime(),
    start: endOfDay(subDays(now, 12)).getTime(),
    title: 'Begin SEM'
  },
  {
    id: '5e8882fcd525e076b3c1542c',
    allDay: false,
    color: '#F79009',
    description: 'Sorry, John!',
    end: setHours(setMinutes(addDays(now, 3), 31), 7).getTime(),
    start: setHours(setMinutes(addDays(now, 3), 30), 7).getTime(),
    title: 'Fire John'
  },
  {
    id: '5e888302e62149e4b49aa609',
    allDay: false,
    color: '#F04438',
    description: 'Discuss about the new project',
    end: setHours(setMinutes(subDays(now, 6), 30), 9).getTime(),
    start: setHours(setMinutes(subDays(now, 6), 0), 9).getTime(),
    title: 'Call Alex'
  },
  {
    id: '5e88830672d089c53c46ece3',
    allDay: false,
    color: '#F04438',
    description: 'Get a new quote for the payment processor',
    end: setHours(setMinutes(now, 30), 17).getTime(),
    start: setHours(setMinutes(now, 30), 15).getTime(),
    title: 'Visit Samantha'
  }
];

export const data = {
  events
};
