import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbCredentials, environment } from "./config";

const dbOoptions: SequelizeOptions = {
  ...dbCredentials,
  models: [__dirname + "/../models"],
  define: {
    timestamps: true,
    freezeTableName: true,
  },
  logging: environment !== "production" ? console.log : false,
};

export const sequelizeConnection = new Sequelize(dbOoptions);

export async function setUpDB() {
  console.log("Setting up database connection...");
  return sequelizeConnection;
}
