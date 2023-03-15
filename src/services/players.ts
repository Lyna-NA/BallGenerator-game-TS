import Player from "../models/Player";

interface PlayerData {
  playerId: string;
  color: string;
  top: number;
  left: number;
}

const PlayerController = {
  index: async (): Promise<{ status: boolean; data: any }> => {
    try {
      const response = await Player.findAll();
      return { status: true, data: response };
    } catch (error) {
      return { status: false, data: null };
    }
  },

  show: async (playerId: string): Promise<{ status: boolean; data: any }> => {
    try {
      const response = await Player.findByPk(playerId);
      console.log("Show-From-PlayerService-----", response);

      if (response == null) {
        return { status: false, data: null };
      }
      return { status: true, data: response };
    } catch (error) {
      return { status: false, data: null };
    }
  },

  store: async (
    playerData: PlayerData
  ): Promise<{ status: boolean; data: any }> => {
    try {
      let response = await Player.create(playerData);
      return { status: true, data: response.dataValues };
    } catch (error) {
      return {
        status: true,
        data: null,
      };
    }
  },

  update: async (
    playerData: PlayerData
  ): Promise<{ status: boolean; data: any }> => {
    try {
      const player = await Player.findByPk(playerData.playerId);

      if (player == null) {
        return { status: false, data: null };
      }

      const response = await Player.update(
        {
          color: playerData.color,
          top: playerData.top,
          left: playerData.left,
        },
        { where: { playerId: playerData.playerId } }
      );
      return { status: true, data: response };
    } catch (error) {
      return { status: false, data: null };
    }
  },

  destroy: async (
    playerId: string
  ): Promise<{ status: boolean; data: any }> => {
    try {
      const result = await Player.destroy({ where: { playerId: playerId } });
      const isDeleted = result === 1;
      return {
        status: isDeleted,
        data: result,
      };
    } catch (error) {
      return { status: false, data: null };
    }
  },
};

export default PlayerController;
