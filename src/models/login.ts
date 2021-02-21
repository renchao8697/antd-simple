import type { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { message } from 'antd';

import { accountLogin } from '@/services/login';

export type StateType = {
  success?: boolean;
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

const UserModel: LoginModelType = {
  namespace: 'login',
  state: {
    success: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // TODO: redirect
      if (response.success) {
        message.success('🎉 🎉 🎉  登录成功！');

        history.replace('/');
      }
    },
    logout() {
      history.replace('/user/login');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        success: payload.success,
      };
    },
  },
};

export default UserModel;
