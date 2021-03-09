import React from 'react';
import { connect, Redirect } from 'umi';
import type { ConnectState } from '@/models/connect';

function Auth({ userLogin, children }: any) {
  const { success } = userLogin;
  if (success) {
    return <>{children}</>;
  }

  return <Redirect to="/user/login" />;
}

export default connect(({ login }: ConnectState) => ({
  userLogin: login,
}))(Auth);
