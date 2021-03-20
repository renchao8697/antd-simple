import request from '@/utils/request';
import type { ITagData } from './data';

export function getCalendar(date: string) {
  const params = { date };
  return request('/api/calendars', { params });
}

export function createCalendar(params: ITagData) {
  return request('/api/calendars', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
