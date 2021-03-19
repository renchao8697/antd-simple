import request from '@/utils/request';
import type { AccountItem, AccountParams } from './data';

export function queryAccount(params: AccountParams) {
  return request('/api/accounts', {
    params,
  }).then((res) => {
    const { list: data, total, current, pageSize } = res.data;
    return {
      data,
      success: true,
      total,
      current,
      pageSize,
    };
  });
}

export function updateAccount(params: AccountItem) {
  return request(`/api/accounts/${params._id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export function deleteAccount(_id: string) {
  return request(`/api/accounts/${_id}`, {
    method: 'DELETE',
    data: {
      _id,
    },
  });
}

export function createAccout(params: AccountItem) {
  return request('/api/accounts', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
