import ky from 'ky'
import { getCookie } from 'cookies-next'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          let token: string | undefined

          if (typeof window === 'undefined') {
            const { cookies: getServerCookies } = await import('next/headers')
            const cookieStore = await getServerCookies()
            token = cookieStore.get('auth-token')?.value
          } else {
            token = getCookie('auth-token') as string | undefined
          }

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        } catch (error) {
          console.error("Erro ao configurar token no header", error)
        }

      }
    ]
  },
  timeout: 15000
})