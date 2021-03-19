import { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import md5 from '@/utils/md5';
import { Redirect } from 'umi';
import { message } from 'antd';

interface IRegister {
  username: string;
  password: string;
}

const Register = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [registerSuccess, setRegister] = useState<boolean>(false);

  const handleSubmit = async (values: IRegister) => {
    let { password } = values;
    password = md5(password);

    const data = {
      ...values,
      password,
    };
    setSubmitting(true);
    try {
      await request('/api/register', { method: 'POST', data });
      setSubmitting(false);
      setRegister(true);
      return;
    } catch {
      message.error('创建失败');
    }
  };

  return (
    <div style={{ width: '328px', margin: '0 auto' }}>
      {registerSuccess && <Redirect to="/user/login" />}
      {!registerSuccess && (
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
            handleSubmit(values as IRegister);
            return Promise.resolve();
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
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
              prefix: <LockTwoTone />,
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
      )}
    </div>
  );
};

export default Register;
