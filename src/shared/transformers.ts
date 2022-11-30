import { User, Role } from '@prisma/client'
import moment from 'moment'

type UserType = User & {
  role?: Role | null
}

export const roleTrans = (role: Role) => {
  return {
    ...role,
    permissions: JSON.parse(role.permissions) as string[],
  }
}

export const userTrans = (user: UserType) => {
  return {
    ...user,
    password: undefined,
    role: user.role ? roleTrans(user.role) : undefined,
  }
}

export const rolesTrans = (roles: Role[]) => roles.map(roleTrans)
export const usersTrans = (users: UserType[]) => users.map(userTrans)
