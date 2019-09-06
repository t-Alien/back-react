// 权限与登录的校验工作
import { Fragment } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
const PrivateRoute = ({ children, user, match, menus }) => {
  console.log(match);
  // 1.登录校验
  if (user) {
    // 2.权限判断
    //2.1 获取到当前页面的 path 地址
    let path = match.path;
    // 2.2 根据 path 去 menus 中找出相对应的菜单
    let menu = menus.find(menu => menu.href === path);
    // 2.3 判断当前用户是否有进入到这个页面的权限
    if (user.roles.includes(menu.roles) || !menu.roles) {
      //有权限 或者 这个页面不需要权限
      return <Fragment>{children}</Fragment>;
    } else {
      //没有权限
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default connect(
  ({ global }) => {
    return {
      user: global.user,
      menus: global.menus,
    };
  },
  null,
)(PrivateRoute);
