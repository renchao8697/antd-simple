export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login'
          },
          {
            path: '/user/login',
            component: './Login'
          }
        ]
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome'
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
            component: './AccountBook'
          }
        ],
      },

      {
        component: './404',
      },
    ],
  },
];
