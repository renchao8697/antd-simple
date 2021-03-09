import request from '@/utils/request';
import type { AccountBookItem, AccountBookParams } from './data';

export function queryAccountBook(params: AccountBookParams) {
  return request('/api/accountbook', {
    params,
  }).then(data => {
    console.log(data)
    return {data: [], success: true, total: 0}
  });
}

export function updateAccountBook(params: AccountBookItem) {
  return request('/api/accountbook', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export function deleteAccountBook(id: string) {
  return request('/api/accountbook', {
    method: 'DELETE',
    data: {
      id,
    },
  });
}

export function createAccoutBook(params: AccountBookItem) {
  return request('/api/accountbook', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
