import { DataTypes, Model } from "sequelize";
import connectToDB from "./db.js";
import util from "util";
// import bcryptjs from "bcryptjs";

export const db = await connectToDB("postgresql:///logindemo");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);