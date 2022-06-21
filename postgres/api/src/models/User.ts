import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
} from 'sequelize-typescript'
import { CreationOptional, Optional } from 'sequelize/types'
import { Role, UserStatus } from '../types/types'

export type UserAttributes = {
  id: number
  name: string
  lastname: string
  email: string
  password?: string
  role: string
  status?: string
  resetPasswordToken?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
  deleteddAt?: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

@Table({
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare lastname: string

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare password: CreationOptional<string | undefined>

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: Role.USER,
    validate: {
      isIn: [Object.values(Role)],
    },
  })
  declare role: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: UserStatus.ACTIVE,
    validate: {
      isIn: [Object.values(UserStatus)],
    },
  })
  declare status: CreationOptional<string>

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare resetPasswordToken: CreationOptional<string>

  @Column({ type: DataType.STRING(1000), allowNull: true })
  declare image: string

  // @CreatedAt
  // declare createdAt: CreationOptional<Date>;

  // @UpdatedAt
  // declare updatedAt: CreationOptional<Date>;

  // @DeletedAt
  // declare deletedAt: CreationOptional<Date>;
}

export default User
