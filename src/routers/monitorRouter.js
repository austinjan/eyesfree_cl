import React from 'react';
import TestD3 from 'Components/dashboard/TestD3';
import MqttSettings from 'Components/mqtt/MqttSettings';
import MqttRecords from 'Components/mqtt/MqttRecords';
import { AnalyseDashboard } from 'Components/dashboard';

export const monitorRouters = [
  {
    key: 'monitorRouters_analyse',
    name: 'Analyse',
    to: '/analyseDashboard',
    icon: 'dashboard',
    component: AnalyseDashboard,
  },
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
  {
    key: 'monitorRouters_mqtt_records',
    name: 'Mqtt records',
    to: '/mqttrecords',
    icon: 'check',
    component: MqttRecords,
  },
];
