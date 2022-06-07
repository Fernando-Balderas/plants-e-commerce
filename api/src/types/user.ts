export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export type PartialUser = Partial<{
  name: string
  lastname: string
  email: string
  role: Role
  status: UserStatus
}>
