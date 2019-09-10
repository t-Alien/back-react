// user 下的仓库数据
import request from '../utils/request';
export default {
  namespaced: 'userManage',

  state: {
    userList: [],
    total: 1, // 用户的总条数
    searchName: '',
  },

  reducers: {
    setUserList(state, action) {
      return {
        ...state,
        ...{
          userList: action.userList,
          total: action.total,
        },
      };
    },
  },

  effects: {
    *deluserList(action, { put }) {
      console.log(action.value);
      const result = yield request.delete(`/api/v1/users/${action.value}`);
      console.log(result);
      window.location.reload();
    }, //获取搜索数据

    *getSearchList(action, { put }) {
      const result = yield request.get('/api/v1/users', {
        params: {
          limit: action.total,
        },
      }); // list 存储包含搜索名字的数据
      const lists = result.users.data.filter(item => {
        if (item.username.indexOf(action.searchName) > -1) {
          return item;
        }
        return lists;
      });

      if (action.searchName) {
        if (lists.length > 0) {
          //搜索名字存在的话
          yield put({
            type: 'setUserList',
            userList: lists,
            total: lists.length,
          });
        } else {
          alert('无法查询该结果！');
          yield put({
            type: 'setUserList',
            userList: result.users.data,
            total: result.users.total,
          });
        }
      } else {
        yield put({
          type: 'setUserList',
          userList: result.users.data,
          total: result.users.total,
        });
      }
    }, //获取用户数据

    *getUserList(action, { put }) {
      const result = yield request.get('/api/v1/users', {
        params: {
          page: action.page || 1,
          limit: action.pageSize || 10,
        },
      });
      yield put({
        type: 'setUserList',
        userList: result.users.data,
        total: result.users.total,
      });
    },
  },
};
