import type { FC, Key, ReactInstance, MouseEvent } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { connect } from 'umi';
import type { ConnectProps, Dispatch } from 'umi';

import type { ConnectState } from '@/models/connect';
import type { StateType as LoginStateType } from '@/models/login';
import style from './index.less';

type EventProps = {
  domEvent: MouseEvent<HTMLElement>;
  key: Key;
  keyPath: Key[];
  item: ReactInstance;
};

type AvatarDropdownProps = {
  dispatch: Dispatch;
  userLogin: LoginStateType;
} & Partial<ConnectProps>;

// TODO: 添加其他Menu.Item
const AvatarDropdown: FC<AvatarDropdownProps> = ({ userLogin, dispatch }) => {
  const { username } = userLogin;

  const onMenuClick = (event: EventProps) => {
    const { key } = event;
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  return (
    <Dropdown
      overlay={() => (
        <Menu onClick={onMenuClick}>
          <Menu.Item key="logout">
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        </Menu>
      )}
    >
      <span className={`${style.action} ${style.account}`}>
        <Avatar size="small" className={style.avatar} icon={<UserOutlined />} />
        <span>{username}</span>
      </span>
    </Dropdown>
  );
};

// TODO: 获取有用的state
export default connect(({ login }: ConnectState) => ({ userLogin: login }))(AvatarDropdown);
