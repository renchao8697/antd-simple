import type { FC } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import type { Dispatch } from 'umi';

import type { ConnectState } from '@/models/connect';
import styles from './index.less';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import { Alert } from 'antd';

export type LoginProps = {
  userLogin: StateType;
  dispatch: Dispatch;
  submitting?: boolean;
};

const LoginMessage: FC<{ content: string }> = ({ content }) => {
  return (
    <Alert
      message={content}
      showIcon
      style={{
        marginBottom: 24,
      }}
      type="error"
    />
  );
};

const Login: FC<LoginProps> = (props) => {
  const { submitting, userLogin = {} } = props;
  const { success } = userLogin;

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        {success === false && !submitting && <LoginMessage content="账户或密码错误" />}
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
          }}
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
