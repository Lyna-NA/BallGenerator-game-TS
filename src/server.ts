// import required modules
import express from 'express';
import http from 'http';

// create a new express app
const app: express.Application = express();

// create a new http server and pass the express app to it
const server: http.Server = http.createServer(app);

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/ball.html');
});

// start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
  const io = require("./utils/socket-io").init(server);
});