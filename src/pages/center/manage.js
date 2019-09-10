/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import React, { Component } from 'react';
import { Avatar, Input, Radio, Button } from 'antd';
import styles from './manage.scss';
import { connect } from 'dva';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

class CenterManage extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      Val: '铁憨憨',
      email: '123@qq.com',
      user: UserList[0],
      color: colorList[0],
    };
  }
  changeUser = () => {
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    console.log(this.props.user);
    let { user } = this.props;
    return (
      <div className={styles.person}>
        <h1>基本资料</h1>
        <Avatar
          className={styles.person_avatar}
          style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }}
          size="large"
        >
          {this.state.user}
        </Avatar>
        <Button
          className={styles.person_button}
          size="default"
          style={{ marginLeft: 16, verticalAlign: 'middle' }}
          onClick={this.changeUser}
          type="primary"
        >
          修改头像
        </Button>
        <p>
          <label>
            <span>用户名</span>&nbsp;&nbsp;
            <Input value={user.username} placeholder="default size" className={styles.ant_input} />
          </label>
        </p>
        <p>
          <label>
            <span>角&nbsp;&nbsp;&nbsp;色</span>&nbsp;&nbsp;
            <Input
              value={user.roles.length > 0 ? user.roles[0] : '普通用户'}
              placeholder="default size"
              className={styles.ant_input}
            />
          </label>
        </p>
        <p>
          <label>
            <span>昵&nbsp;&nbsp;&nbsp;称</span>&nbsp;&nbsp;
            <Input
              defaultValue={this.state.Val}
              placeholder="default size"
              className={styles.ant_input}
            />
          </label>
        </p>
        <label className={styles.person_sex}>
          <span>性&nbsp;&nbsp;&nbsp;别</span>&nbsp;&nbsp;
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </label>
        <p>
          <label>
            <span>邮&nbsp;&nbsp;&nbsp;箱</span>&nbsp;&nbsp;
            <Input
              defaultValue={this.state.email}
              placeholder="default size"
              className={styles.ant_input}
            />
          </label>
        </p>
        <p>
          <label>
            <span className={styles.person_span}>备&nbsp;&nbsp;&nbsp;注</span>&nbsp;&nbsp;
            <Input.TextArea placeholder="请输入内容" autosize={{ minRows: 4, maxRows: 10 }} />
          </label>
        </p>
      </div>
    );
  }
}

export default connect(
  ({ global }) => {
    return {
      user: global.user,
    };
  },
  null,
)(CenterManage);
