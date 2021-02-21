import type { FC } from 'react';
import { Fragment } from 'react';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : Fragment;

const Layout: FC = ({ children }) => <InspectorWrapper>{children}</InspectorWrapper>;

export default Layout;
