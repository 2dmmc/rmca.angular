import {NbMenuItem} from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: '控制台',
    icon: 'fa fa-tachometer',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '常规设置',
    group: true,
  },
  {
    title: '账户管理',
    icon: 'fa fa-user',
    children: [
      {
        title: '个人中心',
        link: '/pages/user/profile',
      },
      {
        title: '正版验证',
        link: '/pages/user/yggdrasil',
      },
    ],
  },
  {
    title: '角色管理',
    icon: 'fa fa-gamepad',
    children: [
      {
        title: '角色列表',
        link: '/pages/player/list',
      },
    ],
  },
];


export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: '高级设置(Admin)',
    group: true,
  },
  {
    title: '服务器管理',
    icon: 'fa fa-sitemap',
    children: [
      {
        title: '服务器列表',
        link: '/pages/manager/server/list',
      },
      {
        title: '服务器历史管理',
        link: '/pages/manager/server/history/detail',
      },
      {
        title: '财务历史管理',
        link: '/pages/manager/server/money/detail',
      },
    ],
  },
  {
    title: 'RMCA管理',
    icon: 'fa fa-gears',
    children: [
      {
        title: '管理员列表',
        link: '/pages/manager/rmca/admin/list',
      },
      {
        title: '玩家管理',
        link: '/pages/manager/rmca/player/list',
      },
    ],
  },
];

export const DEVELOPER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: '功能性入口(Debug)',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'fa fa-lock',
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
