import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { deviceSettingsRoutes, monitorRouters } from '../../routers';
import { MeterIcon } from '../../components/svg';
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
        {typeof submenu.icon === 'string' ? (
          <Icon type={submenu.icon} />
        ) : (
          React.createElement(submenu.icon)
        )}
        <span>{submenu.name}</span>
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
    name: '遠端數據',
    key: 'sidebar_remote_data_menu',
    icon: MeterIcon,
    items: monitorRouters,
  },
  {
    name: '系統設定',
    key: 'sidebar_system_settings',
    icon: 'setting',
    items: deviceSettingsRoutes,
  },
];

const sidebar = () => {
  return (
    <div>
      <Menu
        theme="dark"
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
