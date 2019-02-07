import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { deviceSettingsRoutes } from '../../routers';
import './Sidebar.css';

const SubMenu = Menu.SubMenu;

const defaultOpenKey = menu => {
  if (menu[0]) {
    return menu[0].key.toString();
  }
  return '0';
};

const createSubMenu = submenu => (
  <SubMenu
    key={submenu.key}
    title={
      <span>
        <Icon type={submenu.icon} />
        {submenu.name}
      </span>
    }
  >
    {submenu.items.map(submenuItem => (
      <Menu.Item key={submenuItem.key}>
        <Link to={submenuItem.to}> {submenuItem.name} </Link>
      </Menu.Item>
    ))}
  </SubMenu>
);

const submenus = [
  {
    name: '系統設定',
    key: 10000,
    icon: 'setting',
    items: deviceSettingsRoutes,
  },
];

const sidebar = () => {
  return (
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[defaultOpenKey(submenus)]}
        className="menu"
      >
        {submenus.map(item => createSubMenu(item))}
      </Menu>
    </div>
  );
};

export default sidebar;
