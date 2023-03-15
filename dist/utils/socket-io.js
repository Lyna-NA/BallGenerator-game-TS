"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const players_1 = __importDefault(require("../services/players"));
let io;
const Socket = {
    init: (httpServer) => {
        // create a new socket.io instance and pass the http server to it
        (io = new socket_io_1.Server(httpServer)),
            {
            // cors: {
            //   methods: "GET, POST, PUT, DELETE",
            //   allowedHeaders: "Authorization, Content-Type",
            //   CustomOrigin: "http://localhost:3000",
            //   // credentials: true,
            // },
            };
        // const colors: string[] = [
        //   "#ff0000",
        //   "#00ff00",
        //   "#0000ff",
        //   "#ffff00",
        //   "#ff00ff",
        //   "#00ffff",
        // ];
        const getPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield players_1.default.index();
            return response.data;
        });
        const addPlayer = (playerId, color, top, left) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield players_1.default.store({ playerId, color, top, left });
            console.log("Socket-Add-Response: ", response);
        });
        const removePlayer = (playerId) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield players_1.default.destroy(playerId);
            console.log("Socket-Remove-Response: ", response);
        });
        const updatePlayer = (player) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield players_1.default.update(player);
            console.log("Socket-Update-Response: ", response);
        });
        io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
            //when connect
            console.log("A new player is coming");
            //take socketId from the new player
            // const color: string = colors[Math.floor(Math.random() * colors.length)];
            const defaultColor = "#000000";
            const defaultTop = 50;
            const defaultLeft = 50;
            const playerId = socket.id;
            yield addPlayer(playerId, defaultColor, defaultTop, defaultLeft);
            getPlayers().then(players => {
                console.log("------------------Players-socket:-------------", players);
                io.emit("addPlayer", players);
            }).catch(error => {
                console.error(error);
            });
            //when disconnect
            socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
                console.log("A player left!");
                yield removePlayer(socket.id);
                io.emit("removePlayer", socket.id);
            }));
            //when move
            socket.on("move", (data) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Received move event:", data);
                yield updatePlayer(data);
                // emit the updated player list to all clients
                io.emit("updatePosition", data);
            }));
        }));
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
exports.default = Socket;
