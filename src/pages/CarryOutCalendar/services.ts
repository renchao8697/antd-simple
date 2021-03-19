import request from '@/utils/request';
import type { ICarryOutCalendar } from './data';

export function getCalendar(date: string) {
  const params = { date };
  return request('/api/calendars', { params });
}

export function createCalendar(params: ICarryOutCalendar) {
  return request('/api/calendars', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
