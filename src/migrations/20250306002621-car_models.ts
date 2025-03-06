import { QueryInterface, DataTypes, literal } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable("car_models", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      average_price: {
        type: DataTypes.INTEGER,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        references: { model: "car_brands", key: "id" },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("car_models");
  },
};
