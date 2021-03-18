import request from '@/utils/request';
import type { ICarryOutCalendar } from './data';

export function getCarryOutCalendar(date: string) {
  const params = { date };
  return request('/api/carryOutCalendars', { params });
}

export function createCarryOutCalendar(params: ICarryOutCalendar) {
  return request('/api/carryOutCalendars', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
