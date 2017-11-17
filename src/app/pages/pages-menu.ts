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
        link: '/user/yggdrasil',
      },
      {
        title: 'profile',
        link: '/user/profile',
      },
    ],
  },
  {
    title: '角色管理',
    icon: 'ion-person-stalker',
    children: [
      {
        title: '角色列表',
        link: '/player/list',
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
        link: '/manager/server/list',
      },
      {
        title: '服务器历史管理',
        link: '/manager/server/history/detail',
      },
      {
        title: '财务历史管理',
        link: '/manager/server/money/detail',
      },
    ],
  },
  {
    title: 'RMCA管理',
    icon: 'ion-cube',
    children: [
      {
        title: '管理员列表',
        link: '/manager/rmca/admin/list',
      },
      {
        title: '玩家管理',
        link: '/manager/rmca/player/list',
      },
    ],
  },
  {
    title: '功能性入口',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: '登陆',
        link: '/auth/login',
      },
      {
        title: '注册',
        link: '/auth/register',
      },
      {
        title: '找回密码',
        link: '/auth/request-password',
      },
      {
        title: '重置密码',
        link: '/auth/reset-password',
      },
      {
        title: '登出',
        link: '/auth/logout',
      },
    ],
  },
];
