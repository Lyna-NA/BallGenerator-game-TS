import socketio from "socket.io";
import { Server } from "socket.io";
import http from "http";

let io: Server;

module.exports = {
  init: (httpServer: http.Server) => {
    // create a new socket.io instance and pass the http server to it
    (io = new Server(httpServer)),
      {
        // cors: {
        //   methods: "GET, POST, PUT, DELETE",
        //   allowedHeaders: "Authorization, Content-Type",
        //   CustomOrigin: "http://localhost:3000",
        //   // credentials: true,
        // },
      };

    interface Ball {
      ballId: string;
      color: string;
      top: number;
      left: number;
    }

    let balls: Ball[] = [];

    const colors: string[] = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    const addBall = (
      ballId: string,
      color: string,
      top: number,
      left: number
    ): void => {
      balls.push({ ballId, color, top, left });
    };

    const removeBall = (ballId: string): void => {
      balls = balls.filter((ball: Ball) => ball.ballId !== ballId);
    };

    io.on("connection", (socket: socketio.Socket) => {
      //when connect
      console.log("A new ball is coming");

      //take ballId and socketId from ball
      const color: string = colors[Math.floor(Math.random() * colors.length)];

      const top: number = 50;
      const left: number = 50;

      const ballId: string = socket.id;
      addBall(ballId, color, top, left);
      console.log(balls);

      io.emit("addBall", balls);

      //when disconnect
      socket.on("disconnect", () => {
        console.log("A ball left!");

        removeBall(socket.id);
        console.log(balls);
        io.emit("removeBall", socket.id);
      });

      //when move
      socket.on("move", (data: { ballId: string; x: number; y: number }) => {
        console.log("received move event:", data);

        // find the current player's ball and update its position
        for (let i = 0; i < balls.length; i++) {
          if (balls[i].ballId === data.ballId) {
            console.log(
              `>>>ball-pos-before= left: ${balls[i].left}, top:${balls[i].top}`
            );
            balls[i].left = data.x;
            balls[i].top = data.y;
            console.log(
              `>>>ball-pos-after= left: ${balls[i].left}, top:${balls[i].top}`
            );
            break;
          }
        }

        // emit the updated ball list to all clients
        io.emit("updatePosition", data);
      });
    });

    return io;
  },
  getIO: () => {
    // if(io == undefined || io == null){
    //   console.log('Socket initialization failed!');
    // }else{
    //   console.log('Socket is ready');
    // }
    return io;
  },
};