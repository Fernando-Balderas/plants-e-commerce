import { UserDocument } from '../models/User'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export type PartialUser = Partial<
  {
    _id: string
    picture: string
  } & UserDocument
>
