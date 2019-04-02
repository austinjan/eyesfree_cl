exports.connect = messageHandler => {
  let url = new URL('wss://localhost:3001/ws');
  let querystring = new URLSearchParams({ name: 'hi', topic: '/dev/1/do/1' });
  url.search = querystring;
  console.log('url is: ', url);

  try {
    let ws = new WebSocket('wss://localhost:3001/ws');
    ws.onopen = evt => {
      console.log('Connecttion open');
    };

    ws.onmessage = evt => {
      console.log('Reveived Message: ' + evt.data);
      ws.close();
    };

    ws.onclose = evt => {
      console.log('Connection closed.');
    };
  } catch (err) {
    console.log('websocketAPIs error: ', err);
  }
};
