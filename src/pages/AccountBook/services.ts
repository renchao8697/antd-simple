import request from '@/utils/request';
import type { AccountBookItem, AccountBookParams } from './data';

export function queryAccountBook(params: AccountBookParams) {
  return request('/api/accountBooks', {
    params,
  }).then((res) => {
    return { data: res.data.data, success: true, total: 0 };
  });
}

export function updateAccountBook(params: AccountBookItem) {
  return request(`/api/accountBooks/${params._id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export function deleteAccountBook(_id: string) {
  return request(`/api/accountBooks/${_id}`, {
    method: 'DELETE',
    data: {
      _id,
    },
  });
}

export function createAccoutBook(params: AccountBookItem) {
  return request('/api/accountBooks', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
