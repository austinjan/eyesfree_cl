import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const sidebar = () => {
  return (
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['systemSettings']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="systemSettings"
          title={
            <span>
              <Icon type="setting" />
              系統設定
            </span>
          }
        >
          <Menu.Item key="1">設備設定</Menu.Item>
          <Menu.Item key="2">使用者設定</Menu.Item>
          <Menu.Item key="3">群組設定</Menu.Item>
          <Menu.Item key="4">License序號管理</Menu.Item>
          <Menu.Item key="4">語音/訊息對應</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="gold" />
              test
            </span>
          }
        >
          <Menu.Item key="9">
            <Link to="/login"> Login </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/test"> Test </Link>
          </Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default sidebar;
