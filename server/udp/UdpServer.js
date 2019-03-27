const dgram = require('dgram');

const UDP_SERVER_PORT = 0xda92;

// ip example: 192.168.2.1
function inet_aton(ip) {
  // split into octets
  var a = ip.split('.');
  var buffer = Buffer.alloc(4);
  
  for (var i = 0; i < 4; i++) {
    buffer.writeUInt8(a[i],i);
  }
  return (buffer.readUInt32LE(0));
}

// num example: 3232236033
function inet_ntoa(num) {
  var nbuffer = new ArrayBuffer(4);
  var ndv = new DataView(nbuffer);
  ndv.setUint32(0, num);

  var a = new Array();
  for (var i = 0; i < 4; i++) {
    a[i] = ndv.getUint8(i);
  }
  return a.join('.');
}
const makePackage = option => {
  const { command, dataSize, data } = option;
  const pck = Buffer.alloc(8 + dataSize, 0);
  const sendCommand = command | 0x0abc0000;
  console.log('.........', sendCommand.toString(16));
  pck.writeUInt32LE(sendCommand);
  pck.writeUInt32LE(dataSize, 4);
  console.log('makePackage = ', pck);
  if (data.length > 0) {
    data.copy(pck, 8, 0, data.length);
  }
  return pck;
};

let instance = null;

class UdpServer {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });

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

  sendHello() {
    const buffer = makePackage({
      command: 0x00000001,
      dataSize: 0,
      data: Buffer.alloc(0),
    });
    this.socket.send(
      buffer,
      0,
      buffer.length,
      UDP_SERVER_PORT,
      '255.255.255.255'
    );
  }
}

module.exports = UdpServer;
