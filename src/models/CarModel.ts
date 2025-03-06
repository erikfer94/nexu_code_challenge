import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { CarBrand, ICarBrand } from "./CarBrand";

export interface ICarModel {
  id: number;
  name: string;
  average_price: number;
  brand_id: number;
  createdAt: Date;
  updatedAt: Date;
  brand: ICarBrand;
}

export interface ICreateCarModel
  extends Optional<ICarModel, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "car_models",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
})
export class CarModel
  extends Model<ICarModel, ICreateCarModel>
  implements ICarModel
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  average_price: number;

  @ForeignKey(() => CarBrand)
  @Column({
    type: DataType.INTEGER,
  })
  brand_id: number;

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

  @BelongsTo(() => CarBrand, "brand_id")
  brand: ICarBrand;
}
