/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import React, { Component } from 'react';

import styles from './comment.scss';

import CommentAdd from './comment-add/comment-add';
import CommentList from './comment-list/comment-list';
class Comment extends Component {
  // 给组建对象指定state属性，可以不用constructor
  state = {
    comments: [
      {
        username: '马云',
        content: '一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)',
      },
      {
        username: '马克思',
        content: '虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应',
      },
      {
        username: '比尔盖茨',
        content: '用JS对象树表示DOM树的结构；然后用这个树构建一个真正的DOM树插到文档当中',
      },
      {
        username: '维多利亚',
        content: '这里render不断在执行更新date数据，但是input是不会更新的',
      },
      {
        username: 'Jack',
        content: '拆分组件: 拆分界面,抽取组件,实现静态组件: 使用组件实现静态页面效果',
      },
      {
        username: 'tom',
        content:
          '数据保存在哪个组件，如果是这个数据只是某个组件需要用到，那么就放在该组件，如果有两个组件需要用到',
      },
      {
        username: 'bob',
        content:
          '子组件改变父组件的状态（状态在哪个组件，更新状态的行为就应该定义在哪个组件，父组件定义函数，传给子组件调用)',
      },
    ],
  };

  // 给comment-add组件调用的添加评论的方法
  addComment = comment => {
    const { comments } = this.state;
    comments.unshift(comment);
    this.setState({ comments }); // 更新状态
  };

  deleteComment = index => {
    const { comments } = this.state;
    comments.splice(index, 1);
    this.setState({ comments }); // 更新状态
  };

  render() {
    const { comments } = this.state;
    return (
      <div className={styles.comment}>
        <h1 className={styles.comment_title}>请发表对本网站的评论</h1>
        <div className={styles.comment_main}>
          <div className={styles.comment_content_left}>
            <CommentAdd addComment={this.addComment} />
          </div>
          <div className={styles.comment_content_right}>
            <CommentList comments={comments} deleteComment={this.deleteComment} />
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
