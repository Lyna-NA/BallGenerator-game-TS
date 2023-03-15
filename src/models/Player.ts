import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

interface PlayerAttributes {
  playerId: string;
  color: string;
  top: number;
  left: number;
}

class Player extends Model<PlayerAttributes> implements PlayerAttributes {
  public playerId!: string;
  public color!: string;
  public top!: number;
  public left!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Player.init(
  {
    playerId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    top: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Player",
    timestamps: true,
    underscored: true,
  }
);

export default Player;