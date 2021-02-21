import request from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
