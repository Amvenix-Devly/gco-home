import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { after } from 'next/server'
import ReactMarkdown from 'react-markdown'
import db from '@/lib/db'
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

          {/* Related Posts */}
          <div className="mt-16">
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

export default ItemBlogPage
