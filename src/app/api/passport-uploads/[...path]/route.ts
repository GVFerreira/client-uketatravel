import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

type ParamsPromise = Promise<{ path: string[] }>

export async function GET(req: Request, { params }: { params: ParamsPromise }) {
  const { path: pathSegments } = await params

  const uploadsDirectory = path.join(process.cwd(), 'passport-uploads')
  const fullPath = path.join(uploadsDirectory, ...pathSegments)

  try {
    if (fs.existsSync(fullPath)) {
      const fileBuffer = fs.readFileSync(fullPath)
      const fileExtension = path.extname(fullPath).toLowerCase()

      let contentType = 'application/octet-stream'
      if (fileExtension === '.png') contentType = 'image/png'
      else if (fileExtension === '.jpg' || fileExtension === '.jpeg') contentType = 'image/jpeg'
      else if (fileExtension === '.gif') contentType = 'image/gif'

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
        },
      })
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
