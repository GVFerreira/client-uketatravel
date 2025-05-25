'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface User {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export default function Users({ initialUsers }: { initialUsers: User[] }) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialUsers.map((user, index) => (
          <TableRow key={index}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.avatarUrl as string}/>
                <AvatarFallback>{(user.name)?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              <p>{user.name}</p>
            </TableCell>
            <TableCell>
              <p>{user.email}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
