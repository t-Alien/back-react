// 后台首页需要使用的公共部分，包括公用的头部、公用的左侧边栏等组件

import React from 'react';

import { connect } from 'dva';

import { Layout, Menu, Icon } from 'antd';

import styles from './SimpleLayout.scss';

import Link from 'umi/link';

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
    return (
      <Layout className={styles.normal}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline">
            {/* 根据当前的url地址，判断是否与要链接的地址相同，如果相同，给Menu.Item加上高亮类
                1.获取当前的url地址props.match.path
            */}
            {this.props.menus.map(item => {
              return (
                <Menu.Item
                  key={item.id}
                  className={this.props.match.path === item.href ? 'ant-menu-item-selected' : ''}
                >
                  <Link to={item.href}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
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
    );
  }
}

export default connect(({ global }) => {
  return {
    menus: global.menus,
  };
})(SimpleLayout);
