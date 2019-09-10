import React, { Component, Fragment } from 'react';

import { Form, Icon, Input, Button, Row, Col } from 'antd';

import { connect } from 'dva';

import Link from 'umi/link';

import BackGround from '../../layouts/components/BackGround/index';

import styles from './index.scss';

class Login extends Component {
  handleSubmit = e => {
    // 1.阻止默认提交表单行为
    e.preventDefault();
    // 2.做表单校验，接收一个回调函数，回调函数接收两个参数，error，value
    this.props.form.validateFields((err, values) => {
      // console.log(err); // 表单校验规则不满足就会出现error
      // console.log(values); // 表单input框的内容
      if (!err) {
        // 调用登录接口
        this.props.onLogin(values, this.props.history);
        //console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <BackGround />
        <Row>
          <Col span={6} offset={9}>
            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
              <Form.Item>
                {getFieldDecorator('username', {
                  // 表单校验的规则
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                    { min: 6, message: '密码长度不少于6位!' },
                    { max: 12, message: '密码长度不能超过12位!' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                  Log in
                </Button>
                Or <Link to="/registry">register now!</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default connect(
  null,
  dispatch => {
    return {
      onLogin: (values, history) => {
        dispatch({
          type: 'global/loginSync',
          payload: values,
          history,
        });
      },
    };
  },
)(Form.create(null)(Login));
