import { QueryInterface } from "sequelize";
import modelosJson from "../modelos.json";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const brands: Array<{
      id: number;
      name: string;
    }> = [];
    let id = 0;
    const modelos = modelosJson.map((m) => {
      if (!brands.find((b) => b.name === m.brand_name)) {
        id++;
        brands.push({
          id,
          name: m.brand_name,
        });
      }
      return {
        average_price: m.average_price,
        name: m.name,
        brand_id: id,
      };
    });
    console.log(modelos, brands);
    await queryInterface.bulkInsert("car_brands", brands);
    await queryInterface.bulkInsert("car_models", modelos);
    return true;
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("car_models", null, {});
    await queryInterface.bulkDelete("car_brands", null, {});
  },
};
