import React, { Component } from 'react';
import { Form, Input, Row, Col, Checkbox, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';

class Registry extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let agreement = values.agreement;
      if (!err && agreement) {
        // console.log('Received values of form: ', values);
        // 调用注册接口
        console.log(values);
        
        this.props.onRegistry(values, this.props.history);
      } else {
        message.error('请同意我们的协议');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={6} offset={9}>
          <Form onSubmit={this.handleSubmit} className={styles.login_form}>
            <Form.Item label="Username">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  { min: 6, message: '密码长度不少于6位!' },
                  { max: 12, message: '密码长度不能超过12位!' },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(<Checkbox>I have read the agreement</Checkbox>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  dispatch => {
    return {
      onRegistry: (values,history)  => {
        dispatch({
          type: 'global/registrySync',
          payload: values,
          history,
        });
      },
    };
  },
)(Form.create(null)(Registry));
