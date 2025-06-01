import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/auth/sign-in', process.env.NEXT_PUBLIC_APP_URL)

  const cookie = await cookies()
  cookie.delete('auth-token')

  return NextResponse.redirect(redirectUrl)
}