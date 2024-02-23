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
    // hooks: {
    //   beforeCreate: (user, options) => {
    //     const hashedPassword = bcryptjs.hashSync(
    //       user.password,
    //       bcryptjs.genSaltSync(5)
    //     );
    //     user.password = hashedPassword;
    //     user.firstName = user.firstName.toLowerCase();
    //     user.lastName = user.lastName.toLowerCase();
    //   },
    //   beforeBulkCreate: (users, options) => {
    //     for (let user of users) {
    //       const hashedPassword = bcryptjs.hashSync(
    //         user.password,
    //         bcryptjs.genSaltSync(5)
    //       );
    //       user.password = hashedPassword;
    //       user.firstName = user.firstName.toLowerCase();
    //       user.lastName = user.lastName.toLowerCase();
    //     }
    //   },
    //   beforeUpdate: (user, options) => {
    //     // if (user.password) {
    //     //     const hashedPassword = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(5))
    //     //     user.password = hashedPassword
    //     // }
    //     user.firstName = user.firstName.toLowerCase();
    //     user.lastName = user.lastName.toLowerCase();
    //   },
    // },
    // defaultScope: {
    //   attributes: {
    //     exclude: ["password"],
    //   },
    // },
    // scopes: {
    //   withPassword: {
    //     attributes: {
    //       include: ["password"],
    //     },
    //   },
    // },
    modelName: "user",
    sequelize: db,
  }
);