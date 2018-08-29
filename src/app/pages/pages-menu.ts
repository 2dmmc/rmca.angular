import {NbMenuItem} from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: '控制台',
    icon: 'fas fa-tachometer-alt',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '常规设置',
    group: true,
  },
  {
    title: '账户管理',
    icon: 'fas fa-user',
    children: [
      {
        title: '个人中心',
        link: '/pages/user/profile',
      },
      {
        title: '社交账户授权',
        link: '/pages/user/socials',
      },
    ],
  },
  {
    title: '角色管理',
    icon: 'fas fa-gamepad',
    children: [
      {
        title: '角色列表',
        link: '/pages/player/roles',
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
    icon: 'fas fa-server',
    children: [
      {
        title: '服务器列表',
        link: '/pages/admin/server/servers',
      },
      {
        title: '服务器历史管理',
        link: '/pages/admin/server/history',
      },
      {
        title: '财务历史管理',
        link: '/pages/admin/server/finance',
      },
    ],
  },
  {
    title: 'RMCA管理',
    icon: 'fas fa-cogs',
    children: [
      {
        title: '用户管理',
        link: '/pages/admin/rmca/users',
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
    icon: 'fas fa-lock',
    children: [
      {
        title: '登录',
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
