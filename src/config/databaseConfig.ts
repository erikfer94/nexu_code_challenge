import { SqliteDialect } from "@sequelize/sqlite3";
import dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

interface ConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const databaseConfig: ConfigTs = {
  development: {
    dialect: "sqlite",
    storage: "sequelize.sqlite",
  },
  test: {
    dialect: "sqlite",
    storage: "sequelize.sqlite",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  },
};

export default databaseConfig;

module.exports = databaseConfig;
