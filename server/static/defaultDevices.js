const defaultDevices = {
  devices: [
    {
      key: "10000",
      ip: "192.168.2.2",
      name: "IOT-Gateway",
      sensors: [
        {
          id: 1,
          key: "DI01",
          name: "Input01",
          dataSize: 1,
          mqttBroker: "mqtt://127.0.0.1",
          topic: "input/1",
          format: {
            prefix: "",
            postfix: " "
          }
        },
        {
          id: 2,
          key: "AI01",
          name: "AI01",
          dataSize: 16,
          mqttBroker: "mqtt://127.0.0.1",
          topic: "ai/1",
          format: {
            prefix: "",
            postfix: " "
          }
        }
      ]
    },
    {
      key: "54:23:45:11",
      ip: "192.168.2.222",
      name: "IOT-RemoteIO",
      sensors: [
        {
          id: "ai01",
          key: "ai01",
          name: "AI-01",
          dataSize: 16,
          mqttBroker: "mqtt://127.0.2.1",
          topic: "ai/01",
          format: {
            prefix: "",
            postfix: "cm"
          }
        },
        {
          id: "ai02",
          key: "AI02",
          name: "AI-02",
          dataSize: 16,
          mqttBroker: "mqtt://127.0.2.2",
          topic: "ai/02",
          format: {
            prefix: "",
            postfix: "m"
          }
        }
      ]
    }
  ]
};

module.exports.defaultDevices = defaultDevices;
