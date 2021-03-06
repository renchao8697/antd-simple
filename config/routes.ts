﻿const routes = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/FullScreenLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            path: '/user/login',
            component: './Login',
          },
          {
            path: '/user/register',
            component: './Register',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        wrappers: ['@/wrappers/auth.tsx'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'Welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/account',
            name: 'AccountBook',
            icon: 'account-book',
            component: './AccountBook',
          },
          {
            path: '/carryOutCalendar',
            name: 'CarryOutCalendar',
            icon: 'carry-out',
            component: './CarryOutCalendar',
          },
        ],
      },

      {
        component: './404',
      },
    ],
  },
];

export default routes;
