import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { api } from '@/http/api-client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    const response = await api
      .post('sessions/password', {
        json: { email, password }
      })
      .json<{ token: string }>()

      const teste = await fetch('https://website-ukvistos-server.usmpj4.easypanel.host/test')
      console.log(await teste.json())

      const cookieStore = await cookies()
      cookieStore.set('auth-token', response.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 3
      })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erro ao autenticar:', err)
    return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 })
  }
}
