import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '控制台',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '功能管理',
    group: true,
  },
  {
    title: 'nav',
    icon: 'nb-locked',
    children: [
      {
        title: '登陆',
        link: '/auth/login',
      },
    ],
  },
];
