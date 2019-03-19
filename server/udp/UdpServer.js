const dgram = require('dgram');

const UDP_SERVER_PORT = 0xda92;

let instance = null;

class UdpServer {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.socket = dgram.createSocket('udp4');

    this.socket.bind({ port: UDP_SERVER_PORT }, () => {
      this.socket.setBroadcast(true);
    });

    this.instance = false;
    return instance;
  }

  run() {
    this.socket.on('message', (msg, rinfo) => {
      console.log(
        ` from ${rinfo.address}:${rinfo.port} length:${msg.length}`,
        msg
      );

      if (msg.length <= 0) return;
      const commandLE = msg.readUInt32LE(0);
      const dataSize = msg.readUInt32LE(4);
      console.log(
        `command le : ${commandLE.toString(
          16
        )} command be: ${dataSize.toString()}`
      );
    });

    this.socket.on('listening', () => {
      const address = this.socket.address();
      console.log(`udp server listening ${address.address}:${address.port}`);
    });
  }

  send() {
    this.socket.send();
  }
}

module.exports = UdpServer;
