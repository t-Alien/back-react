import React, { Component } from 'react';
import styles from './comment-item.scss';
import PropTypes from 'prop-types';

class CommentItem extends Component {
  // 子组件类指定接收数据的属性
  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  handleDelete = () => {
    const { comment, index, deleteComment } = this.props;
    // 提示
    if (window.confirm(`确定删除${comment.username}的评论吗`)) {
      // confirm方法不是全局的，需要用window来调用
      // 确定后删除
      deleteComment(index);
    }
  };

  render() {
    const { comment } = this.props;

    return (
      <div className={styles.comment_item}>
        <div className={styles.comment_item_top}>
          <h3 className={styles.comment_item_user}>{comment.username}说：</h3>
          <div className={styles.comment_item_delete}>
            <p onClick={this.handleDelete}>删除</p>
          </div>
        </div>
        <div className={styles.comment_item_content}>{comment.content}</div>
      </div>
    );
  }
}

export default CommentItem;
