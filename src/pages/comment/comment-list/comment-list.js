import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './comment-list.scss';

import CommentItem from '../comment-item/comment-item';
class CommentList extends Component {
  // 子组件类指定接收数据的属性
  static propTypes = {
    comments: PropTypes.array.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  render() {
    const { comments, deleteComment } = this.props;
    const display = comments.length === 0 ? 'block' : 'none';

    return (
      <div className={styles.comment_list}>
        <h2 className={styles.comment_list_title}>评论回复</h2>
        <div className={styles.comment_list_content}>
          {comments.map((comment, index) => (
            <CommentItem
              comment={comment}
              index={index}
              key={index}
              deleteComment={deleteComment}
            />
          ))}
        </div>
        <div className={styles.no_comment_list} style={{ display }}>
          暂无评论，在左侧添加您对React的评价!!!
        </div>
      </div>
    );
  }
}

export default CommentList;
