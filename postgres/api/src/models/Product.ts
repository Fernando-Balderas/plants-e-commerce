import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript'
import { InferAttributes, InferCreationAttributes } from 'sequelize/types'
import Order from './Order'
import OrderProduct from './OrderProduct'
import User from './User'

@Table({
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
  paranoid: true,
})
class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  declare price: number

  @Column({ type: DataType.STRING(1000), allowNull: true })
  declare image: string

  @Column({ type: DataType.ARRAY(DataType.STRING(255)), allowNull: true })
  declare categories: string[]

  @Column({ type: DataType.ARRAY(DataType.STRING(255)), allowNull: true })
  declare variants: string[]

  @Column({ type: DataType.ARRAY(DataType.STRING(255)), allowNull: true })
  declare sizes: string[]

  @Column
  @ForeignKey(() => User)
  declare userId: number

  @BelongsToMany(() => Order, () => OrderProduct)
  declare orders: Order[]

  // @CreatedAt
  // declare createdAt: CreationOptional<Date>;

  // @UpdatedAt
  // declare updatedAt: CreationOptional<Date>;

  // @DeletedAt
  // declare deletedAt: CreationOptional<Date>;
}

export default Product
