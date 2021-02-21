import type { BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import RightContext from '@/components/GlobalHeader/RightContent';

export type BasicLayoutProps = {
  settings: Settings;
} & ProLayoutProps;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { settings } = props;
  return (
    <ProLayout
      {...settings}
      {...props}
      // breadcrumbRender={(routers = []) => [
      //   {
      //     path: '/',
      //     breadcrumbName: 'Home'
      //   },
      //   ...routers,
      // ]}
      menuItemRender={(menuItem, defaultDom) => {
        const { isUrl, path } = menuItem;
        return isUrl || !path || window.location.pathname === path ? (
          defaultDom
        ) : (
          <Link to={path}>{defaultDom}</Link>
        );
      }}
      rightContentRender={() => <RightContext />}
    >
      {props.children}
    </ProLayout>
  );
};

export default connect(({ settings }: ConnectState) => ({ settings }))(BasicLayout);
