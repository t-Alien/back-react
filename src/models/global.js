// 全局需要使用的一些仓库数据，比如 菜单配置、用户信息
import request from '../utils/request';

import { message } from 'antd';

// 取出本地存储数据
const userData = window.sessionStorage.getItem('user');
const jwtData = window.sessionStorage.getItem('jwt');

export default {
  namespaced: 'global',

  state: {
    //菜单集合
    menus: [
      { id: 1, icon: 'windows', name: 'Welcome', href: '/', roles: '' },
      { id: 2, icon: 'usergroup-add', name: '用户管理', href: '/user/manage', roles: 'admin' },
      { id: 3, icon: 'bar-chart', name: '自定义字典', href: '/port/manage', role: '' },
      { id: 4, icon: 'radar-chart', name: '消费情况', href: '/ports/manage', role: '' },
      { id: 5, icon: 'user', name: '个人中心', href: '/center/manage', roles: '' },
      { id: 6, icon: 'star', name: '评论情况', href: '/comment/comment', role: '' },
    ],

    // 当前登录的用户个人信息
    user: userData ? JSON.parse(userData) : null,

    jwt: jwtData ? JSON.parse(jwtData) : null,
  },

  reducers: {
    login(state, action) {
      return {
        ...state,
        ...{
          user: action.user,
        },
      };
    },
    registry(state, action) {
      return {
        ...state,
        ...{
          user: action.user,
        },
      };
    },
  },

  effects: {
    *registrySync(action, { put }) {
      // 1.发送ajax请求
      yield request.post('/api/v1/signup', action.payload);
      // 2.输出注册成功
      message.success('注册成功');
      // 3. 调用 registry 这个reducer
      yield put({
        type: 'registry',
        user: action.username,
      });
      // 4. 跳转页面到登录页 (这里是js代码，采用编程式导航跳转)
      //console.log(action.history);
      action.history.replace('/login');
    },

    *loginSync(action, { put }) {
      // 1.发送ajax请求
      const result = yield request.post('/api/v1/auth', action.payload);
      // console.log(result);
      // 2. 判断接口调用是否真正成功 (可以在发送请求的时候抛出错误)
      // if (result.code === 0) {
      //   message.success('登录成功');
      // } else {
      //   message.error('用户名或密码不正确');
      // }

      // 2.输出登录成功
      message.success('登录成功');
      // 3. 调用 login 这个reducer
      yield put({
        type: 'login',
        user: result.data.user,
        jwt: result.data.jwt,
      });
      // 4.本地存储数据
      window.sessionStorage.setItem('user', JSON.stringify(result.data.user));
      window.sessionStorage.setItem('jwt', JSON.stringify(result.data.jwt));

      // 5. 跳转页面到首页 (这里是js代码，采用编程式导航跳转)
      //console.log(action.history);
      action.history.replace('/');
    },
  },
};
