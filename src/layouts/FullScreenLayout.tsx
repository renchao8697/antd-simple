import type { FC } from 'react';
import { Link } from 'umi';
import styles from './FullScreenLayout.less';
import logo from '../assets/logo.svg';

const FullScreenLayout: FC = (props: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Antd Simple</span>
            </Link>
          </div>
          <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default FullScreenLayout;
