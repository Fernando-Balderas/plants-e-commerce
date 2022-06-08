// Role-Based Access Control (RBAC)
type Rules = {
  [key: string]: {
    view: string[]
    actions: string[]
  }
}

export const rbacRules: Rules = {
  ADMIN: {
    view: ['home', 'products', 'orders', 'users'],
    actions: [
      'products:create',
      'products:edit',
      'products:delete',
      'users:get',
      'users:edit',
    ],
  },
  USER: {
    view: ['home', 'products', 'orders'],
    actions: [],
  },
}

export function check(role: string, action: string) {
  const rolePermissions = rbacRules[role]
  if (!rolePermissions) return false

  const staticPermissions = rolePermissions.view
  if (staticPermissions && staticPermissions.includes(action)) {
    return true
  }

  const dynamicPermissions = rolePermissions.actions
  if (dynamicPermissions && dynamicPermissions.includes(action)) {
    return true
  }
  return false
}
