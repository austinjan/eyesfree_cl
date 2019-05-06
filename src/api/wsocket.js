import { EventEmitter } from 'events';

// Implement Websocket functions

// Default connect to 'ws://localhost:3001/ws'
class WSocket {
  constructor(
    ws = new WebSocket('ws://localhost:3001/ws'),
    ee = new EventEmitter()
  ) {
    this.ws = ws;
    this.ee = ee;
    ws.onmessage = this.message;
    ws.onopen = this.handlerOpen;
    ws.onclose = this.handlerClose;
  }

  // Add listener to WSocket
  on = (e, fn) => {
    this.ee.on(e, fn);
  };

  // Remove listener from WSocket
  off = (e, fn) => {
    this.ee.removeListener(e, fn);
  };

  // Send {action, data} to websocket
  emit = data => {
    console.log('wsocket emit', data);
    const msg = JSON.stringify(data);
    this.ws.send(msg);
  };

  // receive message
  message = e => {
    try {
      const message = JSON.parse(e.data);
      this.ee.emit('message', message);
    } catch (err) {
      this.ee.emit('error', err);
    }
  };

  handlerOpen = () => {
    this.ee.emit('connect');
  };

  handlerClose = () => {
    this.ee.emit('disconnect');
  };

  close = () => {
    this.ws.close();
    this.ee.removeAllListeners();
  };
}

export default WSocket;

// exports.connect = messageHandler => {
//   let url = new URL('wss://localhost:3001/ws');
//   let querystring = new URLSearchParams({ name: 'hi', topic: '/dev/1/do/1' });
//   url.search = querystring;
//   console.log('url is: ', url);

//   try {
//     let ws = new WebSocket('wss://localhost:3001/ws');
//     ws.onopen = evt => {
//       console.log('Connecttion open');
//     };

//     ws.onmessage = evt => {
//       console.log('Reveived Message: ' + evt.data);
//       ws.close();
//     };

//     ws.onclose = evt => {
//       console.log('Connection closed.');
//     };
//   } catch (err) {
//     console.log('websocketAPIs error: ', err);
//   }
// };
