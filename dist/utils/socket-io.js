"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let io;
module.exports = {
    init: (httpServer) => {
        // create a new socket.io instance and pass the http server to it
        io = new socket_io_1.Server(httpServer),
            {
            // cors: {
            //   methods: "GET, POST, PUT, DELETE",
            //   allowedHeaders: "Authorization, Content-Type",
            //   CustomOrigin: "http://localhost:3000",
            //   // credentials: true,
            // },
            };
        let balls = [];
        const colors = [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
        ];
        const addBall = (ballId, color, top, left) => {
            balls.push({ ballId, color, top, left });
        };
        const removeBall = (ballId) => {
            balls = balls.filter((ball) => ball.ballId !== ballId);
        };
        io.on("connection", (socket) => {
            //when connect
            console.log("A new ball is coming");
            //take ballId and socketId from ball
            const color = colors[Math.floor(Math.random() * colors.length)];
            const top = 50;
            const left = 50;
            const ballId = socket.id;
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
            socket.on("move", (data) => {
                console.log("received move event:", data);
                // find the current player's ball and update its position
                for (let i = 0; i < balls.length; i++) {
                    if (balls[i].ballId === data.ballId) {
                        console.log(`>>>ball-pos-before= left: ${balls[i].left}, top:${balls[i].top}`);
                        balls[i].left = data.x;
                        balls[i].top = data.y;
                        console.log(`>>>ball-pos-after= left: ${balls[i].left}, top:${balls[i].top}`);
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
