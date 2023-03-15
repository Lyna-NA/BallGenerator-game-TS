import { Request, Response } from "express";
import PlayerService from "../services/players";

interface PlayerData {
  playerId: string;
  color: string;
  top: number;
  left: number;
}

const PlayerController = {
  index: async (req: Request, res: Response): Promise<void> => {

    const response = await PlayerService.index();

    if (response.status) {
      res
        .status(200)
        .json({
          status: true,
          message: "Data Retrieved Successfully",
          data: response.data,
        });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Error Retrieving Data!", data: null });
    }
  },

  show: async (req: Request, res: Response): Promise<void> => {

    const response = await PlayerService.show(req.params.id);

    if (response.status) {
      res
        .status(200)
        .json({ status: true, message: "Success", data: response.data });
    } else {
      res
        .status(404)
        .json({ status: false, message: "Document not found!", data: null });
    }
  },

  store: async (req: Request, res: Response): Promise<void> => {
    console.log("---------Store-Controller-----------")

    const Player: PlayerData = {
      playerId: req.body.playerId,
      color: req.body.color,
      top: req.body.top,
      left: req.body.left,
    };

    const response = await PlayerService.store(Player);

    if (response.status) {
      res
        .status(201)
        .json({
          status: true,
          message: "Player Created Successfully",
          data: response.data,
        });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "Error Creating New Player!",
          data: null,
        });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {

    const updatedPlayer: PlayerData = {
      playerId: req.params.id,
      color: req.body.color,
      top: req.body.top,
      left: req.body.left,
    };

    const response = await PlayerService.update(updatedPlayer);

    if (response.status) {
      res
        .status(200)
        .json({
          status: true,
          message: "Player Updated Successfully",
          data: response.data,
        });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Error Updating Player!", data: null });
    }
  },

  destroy: async (req: Request, res: Response): Promise<void> => {

    const response = await PlayerService.destroy(req.params.id);

    if (response.status) {
      res
        .status(200)
        .json({
          status: true,
          message: "Player deleted Successfully",
          data: response.data,
        });
    } else {
      res
        .status(404)
        .json({ status: false, message: "Error Deleting Player!", data: null });
    }
  },
};

export default PlayerController;