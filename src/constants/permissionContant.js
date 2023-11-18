export const _create = 'create'
export const _view = 'view'
export const _delete = 'delete'
export const _update = 'update'

// Constants

export const _user = 'user'
export const _roles = 'roles'
export const _organization = 'organization'
export const _facility = 'facility'
export const _department = 'department'
export const _device = 'device'
export const _sensor = 'sensor'

export const hasPermissionToActionAccess = (permissionList, pageAccess, pageAction) => {
  let hasAccess = false
  hasAccess = permissionList?.includes(`${pageAccess}_${pageAction}`)
  return hasAccess
}

export const hasPermissionToAction = (permissionList, pageData) => {
  let hasAccess = false
  hasAccess = permissionList?.includes(`${pageData}`)
  return hasAccess
}
