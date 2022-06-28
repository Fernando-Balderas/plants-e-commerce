// Role-Based Access Control (RBAC)
import { Role } from '../types/user'

export enum Method {
  POST = 'POST',
  GET = 'GET',
  CONNECT = 'CONNECT',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Permission {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const roles = {
  USER: [
    'orders:CREATE',
    'orders:READ',
    'orders:UPDATE',
    'products:READ',
    'user:READ',
  ],
  ADMIN: [
    'orders:CREATE',
    'orders:READ',
    'orders:UPDATE',
    'orders:DELETE',
    'products:CREATE',
    'products:READ',
    'products:UPDATE',
    'products:DELETE',
    'users:CREATE',
    'users:READ',
    'users:UPDATE',
    'users:DELETE',
  ],
}

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
    case Method.PUT:
    case Method.PATCH: {
      return Permission.UPDATE
    }
    case Method.DELETE: {
      return Permission.DELETE
    }
    default:
      break
  }
}

export function hasPermission(role: Role, url: string, method: Method) {
  const permission = methodToPermission(method)
  const endpoint = url.split('/')
  const resource = endpoint[endpoint.length - 1] + ':' + permission
  if (roles[role].includes(resource)) return true
  return false
}
