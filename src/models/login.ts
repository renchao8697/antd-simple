import type { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { message } from 'antd';

import { accountLogin } from '@/services/login';

export type StateType = {
  success?: boolean;
  username?: string;
  id?: string;
  type?: string;
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const saveToken = (token: string) => {
  window.localStorage.setItem('token', token);
};

const saveUserInfo = (userInfo: { username: string; id: string }) => {
  const data = JSON.stringify(userInfo);
  window.localStorage.setItem('userInfo', data);
};

const token = window.localStorage.getItem('token');
const userInfo = JSON.parse(window.localStorage.getItem('userInfo') ?? '{}');

const UserModel: LoginModelType = {
  namespace: 'login',
  state: {
    success: token ? true : undefined,
    username: userInfo.username ? userInfo.username : undefined,
    id: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // TODO: redirect
      if (response.code === 0) {
        message.success('🎉 🎉 🎉  登录成功！');

        history.replace('/');
      }
    },
    logout() {
      history.replace('/user/login');
      saveToken('');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      const { code, data } = payload;
      const { id, username } = data;
      saveToken(data.token);
      saveUserInfo({ id, username });
      return {
        ...state,
        success: code === 0,
        username,
        id,
      };
    },
  },
};

export default UserModel;
