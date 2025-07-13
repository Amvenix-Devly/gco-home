import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Role } from '@prisma/client'

export const POST = async (req: NextRequest) => {
  try {
    const {
      data: { user },
    } = (await getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })) as any
    if (!user || user.type !== Role.ADMIN) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const { postLink } = await req.json()
    if (!postLink) {
      return NextResponse.json(
        { error: 'Post Link  is required' },
        { status: 400 }
      )
    }
    await db?.fbEmbade.create({
      data: {
        embedCode: postLink,
      },
    })
    return NextResponse.json({ message: 'Post Added Successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}




export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const {
      data: { user },
    } = (await getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })) as any

    if (!user || user.type !== Role.ADMIN) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    await db?.fbEmbade.delete({
      where: {
        id: parseInt(id)
      },
    })

    return NextResponse.json({ message: 'Post Deleted Successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
