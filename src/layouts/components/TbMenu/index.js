// 对 antd 中的 menu 进行一层包装，并且实现权限验证
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';

const TbMenu = ({ menus, match, user }) => {
  //console.log(match); //undefined (现在它是一个普通组件)

  //处理左侧菜单是否能够出现
  const newMenus = menus.filter(menu => {
    // if (!menu.roles) {
    //   // 如果权限为空，就会被返回出去
    //   // 说明不需要权限
    //   return true;
    // } else {
    //   return user.roles.includes(menu.roles);
    // }

    return user.roles.includes(menu.roles) || !menu.roles;
  });
  return (
    <Menu theme="dark" mode="inline">
      {newMenus.map(item => {
        return (
          <Menu.Item
            key={item.id}
            className={match.path === item.href ? 'ant-menu-item-selected' : ''}
          >
            <Link to={item.href}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default connect(
  ({ global }) => ({ menus: global.menus, user: global.user }),
  null,
)(TbMenu);
