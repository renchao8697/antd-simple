export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          // {
          //   path: '/',
          //   redirect: '/welcome'
          // },
          {
            path: '/welcome',
            name: 'Welcome',
            icon: 'smile',
            component: './Welcome',
          },
        ],
      },

      {
        component: './404',
      },
    ],
  },
];
