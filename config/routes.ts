const routes = [
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
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        wrappers: [
          '@/wrappers/auth.tsx'
        ],
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
            path: '/accountbook',
            name: 'AccountBook',
            icon: 'account-book',
            component: './AccountBook',
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
