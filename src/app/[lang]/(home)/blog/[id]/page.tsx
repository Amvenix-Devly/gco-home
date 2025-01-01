import db from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { after } from 'next/server'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { IoMailSharp } from 'react-icons/io5'
import ReactMarkdown from 'react-markdown'
import { Donate } from './c'

const siteUrl = process.env.NEXT_PUBLIC_URL!
const getBlog = async (id: string) =>
  await db?.blogPost.findUnique({
    where: { id: id },
    select: {
      title: true,
      content: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
      id: true,
      createdAt: true,
      category: {
        select: {
          name: true,
          id: true,
        },
      },
      views: true,
    },
  })

const relatedPosts = async (catId: number, currentid: string) => {
  return await db?.blogPost.findMany({
    where: {
      AND: [{ categoryId: Number(catId) }, { NOT: { id: currentid } }],
    },
    take: 2,
    select: {
      title: true,
      content: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
      id: true,
    },
  })
}

const ItemBlogPage = async ({ params }: any) => {
  const { id } = (await params) as { id: string }
  const blog = await getBlog(id)
  if (!blog) return notFound()
  const related = await relatedPosts(blog.category.id, id)
  after(async () => {
    await db?.blogPost.update({
      where: { id: id },
      data: {
        views: blog.views + 1,
      },
    })
  })
  const shareUrl = `${siteUrl}/blog/${id}`

  return (
    <article className="min-h-screen">
      <div className="relative h-[60vh] w-full">
        <Image
          src={blog.coverImage.fileUrl}
          alt="Blog post hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container">
          <div className="absolute bottom-0 container mx-auto px-4 pb-12">
            <span className="text-green-400 mb-4 inline-block">
              {blog.category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-white/80 gap-4">
              {/* <div className="flex items-center gap-2">
                <Image
                  src="https://picsum.photos/100/100"
                  alt="Author"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>John Doe</span>
              </div>
              <span>•</span> */}
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* //social sidebar */}

        <div className="sticky top-32  hidden  md:flex flex-col gap-4 float-left">
          <a
            target="_blank"
            className="hover:text-blue-600 transition-colors"
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          >
            <FaFacebook className="size-8" />
          </a>
          <a
            target="_blank"
            className=" transition-colors"
            href={`https://twitter.com/intent/tweet?text=${shareUrl}`}
          >
            <BsTwitterX className="size-8" />
          </a>
          <a
            target="_blank"
            className="hover:text-blue-400 transition-colors"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
          >
            <FaLinkedin className="size-8" />
          </a>
          <a
            target="_blank"
            className="hover:text-red-600 transition-colors"
            href={`mailto:?subject=GCO&body=${shareUrl}`}
          >
            <IoMailSharp className="size-8" />
          </a>
        </div>

        <div className="flex justify-between flex-col xl:flex-row">
          <div className="max-w-3xl mx-auto">
            <div className="prose dark:prose-invert lg:prose-lg">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/blog?catId=${blog.category.id}`}
                className="text-green-400 mb-4 inline-block"
              >
                {blog.category.name}
              </Link>
            </div>
          </div>
          <div className="xl:w-[33.33%] mx-auto w-full max-w-[500px] mt-10 xl:mt-0">
            <Donate />
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          {/* Related Posts */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related &&
                related.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block"
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-[2px]">
                      <Image
                        src={post.coverImage.fileUrl}
                        alt="Related post"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 dark:text-white group-hover:text-green-500 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <ReactMarkdown
                      allowedElements={[
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'blockquote',
                      ]}
                      className="text-gray-600 dark:text-gray-300 text-sm mb-4 [&>*]:inline"
                    >
                      {post.content.slice(0, 100) + '...'}
                    </ReactMarkdown>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const allBlog = await db?.blogPost.findMany({
    select: {
      id: true,
    },
  })
  return allBlog
}

import type { Metadata } from 'next'

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const { id } = (await params) as { id: string }
  const blog = await getBlog(id)
  if (!blog) return notFound()
  return {
    title: blog.title,
    description: blog.content.slice(0, 100),
    twitter: {
      title: blog.title,
      description: blog.content.slice(0, 100),
      images: [
        {
          url: blog.coverImage.fileUrl,
          alt: blog.title,
          width: 800,
          height: 600,
        },
      ],
    },
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 100),

      images: [
        {
          url: blog.coverImage.fileUrl,
          alt: blog.title,
          width: 800,
          height: 600,
        },
      ],
    },
  }
}
export default ItemBlogPage
