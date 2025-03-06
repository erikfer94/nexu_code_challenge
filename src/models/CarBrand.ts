import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import { CarModel, ICarModel } from "./CarModel";
import { VIRTUAL } from "sequelize";

export interface ICarBrand {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  models: ICarModel[];
  average_price: number;
}

export interface ICreateCarBrand
  extends Optional<ICarBrand, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "car_brands",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
})
export class CarBrand
  extends Model<ICarBrand, ICreateCarBrand>
  implements ICarBrand
{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @Column(DataType.VIRTUAL)
  get averagePrice() {
    return (
      this.models?.map((f) => f.average_price).reduce((a, b) => a + b, 0) /
      this.models?.length
    );
  }
  average_price: number;

  @HasMany(() => CarModel, "brand_id")
  models: ICarModel[];
}
