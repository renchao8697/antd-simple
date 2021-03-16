import request from '@/utils/request';

export function getCarryOutCalendar(date: string) {
  const params = { date };
  return request('/api/carryOutCalendars', { params });
}
