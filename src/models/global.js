// 全局需要使用的一些仓库数据，比如 菜单配置、用户信息

export default {
  namespaced: 'global',

  state: {
    //菜单集合
    menus: [
      { id: 1, icon: 'video-camera', name: 'Welcome', href: '/' },
      { id: 2, icon: 'user', name: '用户管理', href: '/user/manage' },
    ],
  },
};
