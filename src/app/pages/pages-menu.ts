import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '控制台',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '常规设置',
    group: true,
  },
  {
    title: '账户管理',
    icon: 'ion-person',
    children: [
      {
        title: '正版验证',
        link: '/auth/login',
      },
    ],
  },
  {
    title: '角色管理',
    icon: 'ion-person-stalker',
    children: [
      {
        title: '角色列表',
        link: '/auth/login',
      },
    ],
  },
  {
    title: '高级设置',
    group: true,
  },
  {
    title: '服务器管理',
    icon: 'ion-grid',
    children: [
      {
        title: '服务器列表',
        link: '/auth/login',
      },
      {
        title: '玩家管理',
        link: '/ergergerg',
      },
    ],
  },
  {
    title: 'RMCA管理',
    icon: 'ion-cube',
    children: [
      {
        title: '管理员列表',
        link: '/auth/login',
      },
      {
        title: '服务器历史管理',
        link: '/auth/login',
      },
      {
        title: '财务历史管理',
        link: '/asdasdasr',
      },
    ],
  },
];
