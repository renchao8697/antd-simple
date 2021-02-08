import { FC } from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';

const BacicLayout: FC = (props) => {
  return (
    <ProLayout
      title="Haha"
      menuItemRender={(item, dom) => {
        console.log(item, dom);
        return <div>dddd</div>;
      }}
      menuDataRender={(menuList: MenuDataItem[]) => {
        console.log(menuList);
        return menuList;
      }}
    >
      {props.children}
    </ProLayout>
  );
};

export default BacicLayout;
