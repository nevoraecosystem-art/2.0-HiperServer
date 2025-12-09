export const EventsService = {
  schedule: (name: string, date: string) => ({ name, date, status: 'scheduled' }),
};
