import socketIo from "socket.io";
import { Server } from "socket.io";
import http from "http";
import PlayerService from "../services/players";

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

    interface PlayerData {
      playerId: string;
      color: string;
      top: number;
      left: number;
    }

    const colors: string[] = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    const getPlayers = async (): Promise<PlayerData[]> => {
      const response = await PlayerService.index();
      return response.data;
    };

    const addPlayer = async (
      playerId: string,
      color: string,
      top: number,
      left: number
    ): Promise<void> => {
      const response = await PlayerService.store({playerId, color, top, left})
      console.log("Socket-Add-Response: ", response)
    };

    const removePlayer = async (playerId: string): Promise<void> => {
      const response = await PlayerService.destroy(playerId);
      console.log("Socket-Remove-Response: ", response)
    };

    const updatePlayer = async (player: PlayerData) : Promise<void> => {
      const response = await PlayerService.update(player);
      console.log("Socket-Update-Response: ", response)
    }

    io.on("connection", async (socket: socketIo.Socket) => {
      //when connect
      console.log("A new player is coming");

      //take socketId from the new player
      const color: string = colors[Math.floor(Math.random() * colors.length)];

      const top = 50;
      const left = 50;
      const playerId: string = socket.id;
      
      await addPlayer(playerId, color, top, left);

      getPlayers().then(players => {
        console.log("------------------Players-socket:-------------", players);
        io.emit("addPlayer", players);
      }).catch(error => {
        console.error(error);
      });

      //when disconnect
      socket.on("disconnect", async () => {
        console.log("A player left!");

        await removePlayer(socket.id);
        io.emit("removePlayer", socket.id);
      });

      //when move
      socket.on("move", async (data: { playerId: string, color: string, top: number, left: number }) => {
        
        console.log("Received move event:", data);

        await updatePlayer(data);

        // emit the updated player list to all clients
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