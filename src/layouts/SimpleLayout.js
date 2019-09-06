// 后台首页需要使用的公共部分，包括公用的头部、公用的左侧边栏等组件

import React from 'react';

import { connect } from 'dva';

import { Layout, Menu, Icon } from 'antd';

import styles from './SimpleLayout.scss';

import TbMenu from './components/TbMenu';

const { Header, Sider, Content } = Layout;

class SimpleLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    //console.log(this.props);

    // // 最先开始就做登录判断  (在父级上已经做了操作)
    // if (!this.props.user) {
    //   // 直接去登录页面
    //   this.props.history.replace('/login');
    //   return null;
    // }

    // 当前用户的角色集合
    // const userRoles = this.props.user && this.props.user.roles;
    // // 获取当前用户的 menus 对仓库中的 menus 数据根据当前用户的角色做过滤
    // const userMenus = this.props.menus.filter(menu => {
    //   // 1.拿出 user.roles，判断是否有 admin 在里面
    //   // 如果有的话，不做处理
    //   // 如果没有的话，过滤掉 用户管理 菜单
    //   if (userRoles.includes('admin')) {
    //     return true;
    //   } else {
    //     return menu.name !== '用户管理';
    //   }
    // });

    return (
      // 登录状态判断
      // this.props.user ? (
      <Layout className={styles.normal}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} />
          <TbMenu match={this.props.match} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
      // ) : (
      //   <Redirect to="/login" />
      // )
    );
  }
}

export default connect(({ global }) => {
  return {
    menus: global.menus,
    user: global.user,
  };
})(SimpleLayout);
