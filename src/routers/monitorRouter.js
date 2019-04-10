import React from 'react';
import TestD3 from '../components/dashboard/TestD3';
import MqttSettings from '../containers/mqtt/MqttSettings';
export const monitorRouters = [
  {
    key: 'monitorRouters_all_devices',
    name: 'All Devices',
    to: '/monitorAll',
    icon: 'setting',
    component: () => (
      <div>
        <h1> All Devices </h1>
      </div>
    ),
  },
  {
    key: 'monitorRouters_setting_display_layout',
    name: 'Setting Dashboard',
    to: '/settingDashboard',
    icon: 'setting',
    component: () => (
      <div>
        <h1>Setting Dashboard</h1>
      </div>
    ),
  },
  {
    key: 'monitorRouters_test',
    name: 'Test',
    to: '/monitorTest',
    icon: 'check',
    component: TestD3,
  },
  {
    key: 'monitorRouters_mqtt',
    name: 'Mqtt Settings',
    to: '/mqttsettings',
    icon: 'check',
    component: MqttSettings,
  },
];
