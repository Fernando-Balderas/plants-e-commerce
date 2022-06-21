// import { Model, DataTypes, Optional, CreationOptional } from "sequelize";
import { Role, UserStatus } from "../types/types";

export type UserAttributes = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
  status?: string;
  resetPasswordToken?: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleteddAt?: Date;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

// class User extends Model<UserAttributes, UserCreationAttributes> {
//   declare id: number;
//   declare name: string;
//   declare lastname: string;
//   declare email: string;
//   declare password: CreationOptional<string | undefined>;
//   declare role: string;
//   declare status: CreationOptional<string>;
//   declare resetPasswordToken: CreationOptional<string>;
//   declare picture: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(255),
//       allowNull: false,
//     },
//     lastname: {
//       type: new DataTypes.STRING(255),
//       allowNull: true,
//     },
//     email: {
//       type: new DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: new DataTypes.STRING(255),
//       allowNull: true,
//     },
//     role: {
//       type: new DataTypes.STRING(255),
//       allowNull: true,
//       defaultValue: Role.USER,
//     },
//     status: {
//       type: new DataTypes.STRING(100),
//       allowNull: true,
//       defaultValue: UserStatus.ACTIVE,
//     },
//     resetPasswordToken: {
//       type: new DataTypes.STRING(255),
//       allowNull: true,
//     },
//     picture: {
//       type: new DataTypes.STRING(1000),
//       allowNull: true,
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize, // passing the `sequelize` instance is required
//     modelName: "User",
//     tableName: "users",
//   }
// );

// export default User;

import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
} from "sequelize-typescript";
import { CreationOptional, Optional } from "sequelize/types";

@Table({
  modelName: "User",
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare lastname: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare password: CreationOptional<string | undefined>;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: Role.USER,
    validate: {
      isIn: [Object.values(Role)],
    },
  })
  declare role: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: UserStatus.ACTIVE,
    validate: {
      isIn: [Object.values(UserStatus)],
    },
  })
  declare status: CreationOptional<string>;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare resetPasswordToken: CreationOptional<string>;

  @Column({ type: DataType.STRING(1000), allowNull: true })
  declare picture: string;

  // @CreatedAt
  // declare createdAt: CreationOptional<Date>;

  // @UpdatedAt
  // declare updatedAt: CreationOptional<Date>;

  // @DeletedAt
  // declare deletedAt: CreationOptional<Date>;
}

export default User;
