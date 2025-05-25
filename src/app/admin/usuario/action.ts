import { api } from "@/http/api-client"

interface GetUsersResponse {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export async function getUsers() {
  const result = await api.get('get-users').json<GetUsersResponse[]>()
  
  return result
}

interface createUserRequest {
  name: string
  email: string
  password: string
}

interface createUserResponse {
  status: number
  message: string
}

export async function createUser(data: createUserRequest) {
  const result = await api.post('users', {
    json: data
  }).json<createUserResponse>()

  return result
}