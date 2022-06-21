import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import { InferAttributes, InferCreationAttributes } from 'sequelize/types'
import Order from './Order'
import Product from './Product'

@Table({
  modelName: 'OrderProduct',
  tableName: 'orders-products',
  timestamps: true,
  paranoid: true,
})
class OrderProduct extends Model<
  InferAttributes<OrderProduct>,
  InferCreationAttributes<OrderProduct>
> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column
  @ForeignKey(() => Order)
  declare orderId: number

  @Column
  @ForeignKey(() => Product)
  declare productId: number

  // @CreatedAt
  // declare createdAt: CreationOptional<Date>;

  // @UpdatedAt
  // declare updatedAt: CreationOptional<Date>;

  // @DeletedAt
  // declare deletedAt: CreationOptional<Date>;
}

export default OrderProduct
