import React, { Component } from 'react';
import styles from './comment-add.scss';
import propTypes from 'prop-types';

class CommentAdd extends Component {
  static propTypes = {
    addComment: propTypes.func.isRequired,
  };
  state = {
    username: '',
    content: '',
  };

  // 一个事件需要使用bind绑定this，太麻烦，而已使用箭头函数（里面没有this，使用外围的this）
  handleSubmit = () => {
    // 收集表单数据
    const comment = this.state;
    // 更新状态
    this.props.addComment(comment);

    // 清除输入框的数据
    this.setState({
      username: '',
      content: '',
    });
  };

  handleNameChange = event => {
    const username = event.target.value;
    this.setState({ username: username });
  };

  handleContentChange = event => {
    const content = event.target.value;
    this.setState({ content: content });
  };

  render() {
    const { username, content } = this.state;
    return (
      <div className={styles.comment_add}>
        <div className={styles.user_name_content}>
          <h5 className={styles.user_name_title}>用户名</h5>
          <input
            className={styles.user_name_input}
            type="text"
            value={username}
            onChange={this.handleNameChange}
          />
        </div>
        <div className={styles.comment_content}>
          <h5 className={styles.comment_content_title}>评论内容</h5>
          <textarea
            className={styles.comment_content_input}
            type="text"
            value={content}
            onChange={this.handleContentChange}
          />
        </div>
        <div className={styles.submit_btn} onClick={this.handleSubmit}>
          提交
        </div>
      </div>
    );
  }
}

export default CommentAdd;
