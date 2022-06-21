import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript'
import { InferAttributes, InferCreationAttributes } from 'sequelize/types'
import { PaymentStatus } from '../types/types'
import OrderProduct from './OrderProduct'
import Product from './Product'
import User from './User'

@Table({
  modelName: 'Order',
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
})
class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  declare total: number

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    defaultValue: PaymentStatus.PENDING,
    validate: {
      isIn: [Object.values(PaymentStatus)],
    },
  })
  declare paymentStatus: string

  @Column
  @ForeignKey(() => User)
  declare userId: number

  @BelongsToMany(() => Product, () => OrderProduct)
  declare products: Product[]

  // @CreatedAt
  // declare createdAt: CreationOptional<Date>;

  // @UpdatedAt
  // declare updatedAt: CreationOptional<Date>;

  // @DeletedAt
  // declare deletedAt: CreationOptional<Date>;
}

export default Order
