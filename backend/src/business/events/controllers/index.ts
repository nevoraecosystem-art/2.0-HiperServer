export const EventsController = {
  list: () => ({ events: [] }),
  create: (payload: unknown) => ({ created: payload }),
};
