'use server'

import { getUsers } from '../action'
import UsersTable from './users-table'

export default async function UserListWrapper() {
  const users = await getUsers()
  console.log('fetching users')

  return <UsersTable initialUsers={users} />
}
