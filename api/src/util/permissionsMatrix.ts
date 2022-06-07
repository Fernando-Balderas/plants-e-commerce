import { Role } from 'user'

export enum Method {
  POST = 'POST',
  GET = 'GET',
  CONNECT = 'CONNECT',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Permission {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const permissions = {
  USER: ['READ'] as Permission[],
  ADMIN: ['CREATE', 'READ', 'UPDATE', 'DELETE'] as Permission[],
}

// TODO: Add validation for routes

function methodToPermission(method: Method) {
  switch (method) {
    case Method.POST: {
      return Permission.CREATE
    }
    case Method.GET:
    case Method.CONNECT:
    case Method.HEAD:
    case Method.OPTIONS:
    case Method.TRACE: {
      return Permission.READ
    }
    case Method.PUT: {
      return Permission.UPDATE
    }
    case Method.DELETE: {
      return Permission.DELETE
    }
    default:
      break
  }
}

export function hasPermission(target: Role, method: Method) {
  const permission = methodToPermission(method)
  if (permission && permissions[target].includes(permission)) return true
  return false
}
