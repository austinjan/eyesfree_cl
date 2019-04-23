import React from 'react';

import { DeviceSettings, UserSettings } from 'Components/settings';

export const deviceSettingsRoutes = [
  {
    key: 11001,
    name: '設備設定',
    to: '/deviceSettings',
    icon: 'setting',
    component: DeviceSettings,
  },
  {
    key: 11002,
    name: '使用者設定',
    to: '/userSettings',
    icon: 'setting',
    component: UserSettings,
  },
  {
    key: 11003,
    name: '群組設定',
    to: '/groupSettings',
    icon: 'setting',
    component: () => (
      <div>
        <h1>GroupSettings</h1>
      </div>
    ),
  },
  {
    key: 11004,
    name: 'License序號管理',
    to: '/licenseSettings',
    icon: 'setting',
    component: () => (
      <div>
        <h1>License settings</h1>
      </div>
    ),
  },
  {
    key: 11005,
    name: '語音/訊息對應',
    to: '/voiceSettings',
    icon: 'setting',
    component: () => (
      <div>
        <h1>voiceSettings</h1>
      </div>
    ),
  },
];
