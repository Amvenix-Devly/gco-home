import { getSession } from '@/lib/auth-client'
import db from '@/lib/db'
import UploadFile, { imageKit } from '@/lib/ImageKit'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { FileType, Role } from '../../../../dbOut'

export const POST = async (req: NextRequest) => {
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

  const body = await req.formData()
  const title = body.get('title') as string
  const description = body.get('description') as string
  const coverImage = body.get('coverImage')
  const category = body.get('category') as string
  const published = body.get('published') as string
  const views = parseInt(body.get('views') as string) || 0 // Add this line

  if (!title || !description || !coverImage || !category || !published) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    )
  }

  try {
    const res = await UploadFile(coverImage, 'blog')
    const newFile = await db.file.create({
      data: {
        fileId: res.fileId,
        fileUrl: res.url,
        type: FileType.BLOG_COVER,
      },
    })
    await db.blogPost.create({
      data: {
        title: title,
        content: description,
        published: published === 'true',
        categoryId: Number(category),
        coverImageID: newFile.id,
        views: views, // Add this line
      },
    })

    return NextResponse.json({ message: 'blog create' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = async (req: NextRequest) => {
  const qery = req.nextUrl.searchParams.get('blogId') as string
  const blog = await db.blogPost.findUnique({
    where: {
      id: qery,
    },
    select: {
      id: true,
      title: true,
      published: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
      content: true,
      createdAt: true,
      views: true,
    },
  })

  return NextResponse.json({ data: blog })
}

export const PUT = async (req: NextRequest) => {
  const {
    data: { user },
  } = (await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })) as any
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (user.type !== Role.ADMIN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const blogId = req.nextUrl.searchParams.get('blogId')
  if (!blogId) {
    return NextResponse.json(
      { message: 'Blog ID is required' },
      { status: 400 }
    )
  }

  const body = await req.formData()
  const title = body.get('title') as string
  const description = body.get('value') as string
  const coverImage = body.get('coverImage')
  const category = body.get('category') as string
  const published = body.get('published') as string
  const views = parseInt(body.get('views') as string) || 0 // Add this line

  if (!title || !description || !category || !published) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    )
  }

  try {
    let newFile
    let oldBlogImageId
    if (coverImage) {
      const oldBlogImage = await db.blogPost.findUnique({
        where: {
          id: blogId,
        },
        select: {
          coverImage: {
            select: {
              fileId: true,
              id: true,
            },
          },
        },
      })
      oldBlogImageId = oldBlogImage?.coverImage?.id
      if (oldBlogImage?.coverImage?.fileId) {
        await imageKit.deleteFile(oldBlogImage.coverImage.fileId)
      }

      const res = await UploadFile(coverImage, 'blog')
      newFile = await db.file.create({
        data: {
          fileId: res.fileId,
          fileUrl: res.url,
          type: FileType.BLOG_COVER,
        },
      })
    }

    await db.blogPost.update({
      where: { id: blogId },
      data: {
        title: title,
        content: description,
        published: published === 'true',
        categoryId: Number(category),
        views: views, // Add this line
        ...(newFile && { coverImageID: newFile.id }),
      },
    })
    oldBlogImageId &&
      (await db.file.delete({
        where: {
          id: Number(oldBlogImageId),
        },
      }))

    return NextResponse.json({ message: 'Blog updated' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: NextRequest) => {
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

  const blogId = req.nextUrl.searchParams.get('blogId')
  if (!blogId) {
    return NextResponse.json(
      { message: 'Blog ID is required' },
      { status: 400 }
    )
  }

  try {
    const blog = await db.blogPost.findUnique({
      where: { id: blogId },
      select: {
        coverImage: {
          select: {
            fileId: true,
            id: true,
          },
        },
      },
    })

    if (blog?.coverImage?.fileId) {
      await imageKit.deleteFile(blog.coverImage.fileId)
    }

    await db.blogPost.delete({
      where: { id: blogId },
    })

    if (blog?.coverImage?.id) {
      await db.file.delete({
        where: { id: blog.coverImage.id },
      })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
