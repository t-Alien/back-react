/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '用户邮箱',
    dataIndex: 'email',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
  },
];

class UserManage extends Component {
  render() {
    return (
      <div>
        <h1>用户管理页面信息-女装大佬</h1>
        <Table
          pagination={{
            position: 'top',
            total: this.props.total,
            onChange: this.props.getUserList,
          }}
          rowKey="id"
          dataSource={this.props.userList}
          columns={columns}
        />
      </div>
    );
  }
  componentDidMount() {
    // 请求用户数据
    this.props.getUserList();
  }
}

export default connect(
  ({ userManage }) => {
    return {
      userList: userManage.userList,
      total: userManage.total,
    };
  },
  dispatch => {
    return {
      /**
       * 获取用户列表和分页切换
       * @param {Number} page  页码
       * @param {Number} pageSize 每页显示的条数
       */
      getUserList: (page, pageSize) => {
        dispatch({
          type: 'userManage/getUserList',
          page,
          pageSize,
        });
      },

      /**
       * 页面发生变化的时候触发
       */
      // onChange(page, pageSize) {
      //   console.log(page);
      //   console.log(pageSize);
      //   dispatch({
      //     type: 'userManage/getUserList',
      //     page,
      //     pageSize,
      //   });
      // },
    };
  },
)(UserManage);
