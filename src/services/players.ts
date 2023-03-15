import Player from "../models/Player";

interface PlayerData {
  playerId: string;
  color: string;
  top: number;
  left: number;
}

const PlayerController = {
  index: async (): Promise<{ status: boolean; data: PlayerData[] }> => {
    try {
      const response = await Player.findAll();
      return { status: true, data: response };
    } catch (error) {
      return { status: false, data: [] };
    }
  },

  show: async (playerId: string): Promise<{ status: boolean; data: PlayerData|null }> => {
    try {
      const response = await Player.findByPk(playerId);

      return { status: (response !== null), data: response };
    } catch (error) {
      return { status: false, data: null };
    }
  },

  store: async (
    playerData: PlayerData
  ): Promise<{ status: boolean; data: PlayerData|null }> => {
    try {
      const response = await Player.create(playerData);
      return { status: true, data: response };
    } catch (error) {
      return { status: false, data: null};
    }
  },

  update: async (
    playerData: PlayerData
  ): Promise<{ status: boolean; data: number|null }> => {
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

      const isUpdated: boolean = response[0] == 1;
      
      return { status: isUpdated, data: response[0] };

    } catch (error) {
      return { status: false, data: null };
    }
  },

  destroy: async (
    playerId: string
  ): Promise<{ status: boolean; data: number|null }> => {
    try {
      const player = await Player.findByPk(playerId);

      if (player == null) {
        return { status: false, data: null };
      }

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
