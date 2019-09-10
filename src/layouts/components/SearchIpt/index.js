import React from 'react';
import { Input, Button } from 'antd';
import { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.scss';

class SearchIpt extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      total: 999,
    };
  }

  render() {
    return (
      <Fragment>
                        
        <Input
          className={styles.ipt}
          placeholder="请输入内容"
          value={this.state.searchName}
          onChange={this.onChangeValue}
        />
                        
        <Button className={styles.btn} type="primary" onClick={this.onSearch}>
          搜索
        </Button>
                    
      </Fragment>
    );
  }

  onChangeValue = e => {
    let value = e.target.value;
    this.setState({
      searchName: value,
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.searchName, this.state.total);
  };
}

export default connect(
  null,
  dispatch => {
    return {
      onSearch(val, total) {
        dispatch({
          type: 'userManage/getSearchList',
          searchName: val,
          total,
        });
      },
    };
  },
)(SearchIpt);
