//modules: require
import express, { Request, Response, NextFunction } from "express";
import HttpError from "./models/HttpError";
import SequelizeManager from "./utils/sequelize-manager";
import http from "http";
import Socket from "./utils/socket-io";
import path from "path";

//modules: routes
import playerRoutes from "./routes/player-routes";

//sequelizeManager
const manager = new SequelizeManager();

// create a new express app
const app: express.Application = express();

//app.use: urlEncoded
//Content-Type: application/x-www-form-url-encoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use("/public", express.static(path.join(__dirname, "public")));


//app.use: routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use("/api/players", playerRoutes);

//app.player: Fallback route
app.use("/", (req: Request, res: Response) => {
  throw new HttpError(404, "Not Found");
});

//app.use: Thrown Error Handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.code).json({ status: false, message: error.message });
});

//manage the connection
manager.authenticate();

manager.syncModels(async (message: string, status: boolean) => {

  console.log(">>>>>>>>>>>>", message);

  if (status) {
    const server:http.Server = app.listen(3000);

    console.log("==============================================");
    console.log('Server running on port 5000');
    console.log("==============================================");
    
    Socket.init(server);
  }
});