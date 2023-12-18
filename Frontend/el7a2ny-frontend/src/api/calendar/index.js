import { createResourceId } from '../../utils/create-resource-id';
import { deepCopy } from '../../utils/deep-copy';
import { data } from './data';

class CalendarApi {
  getEvents(request) {
    return Promise.resolve(deepCopy(data.events));
  }

  createEvent(request) {
    const { allDay, description, end, start, title } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(data.events);

        // Create the new event
        const event = {
          id: createResourceId(),
          allDay,
          description,
          end,
          start,
          title
        };

        // Add the new event to events
        clonedEvents.push(event);

        // Save changes
        data.events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateEvent(request) {
    const { eventId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(data.events);

        // Find the event that will be updated
        const event = clonedEvents.find((event) => event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        // Update the event
        Object.assign(event, update);

        // Save changes
        data.events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteEvent(request) {
    const { eventId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        let clonedEvents = deepCopy(data.events);

        // Find the event that will be removed
        const event = clonedEvents.find((event) => event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        clonedEvents = clonedEvents.filter((event) => event.id !== eventId);

        // Save changes
        data.events = clonedEvents;

        resolve(true);
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const calendarApi = new CalendarApi();
