'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

type blogType = {
  title: string
  id: string
  content: string
  coverImage: {
    fileUrl: string
  }
}

const BlogSection = ({
  mostViewedBlog,
  listBlog,
}: {
  mostViewedBlog: blogType | null
  listBlog: blogType[]
}) => {
  const { push } = useRouter()
  return (
    <section className="w-full relative overflow-hidden">
      <div className="container px-10 pt-5">
        <div className="mt-10">
          <h1 className="!text-2xl font-semibold md:!text-3xl !pt-10 !text-start">
            News and Blogs
          </h1>
        </div>
        <div className="mt-10 md:flex md:gap-5">
          <BigNews
            title={mostViewedBlog?.title as string}
            description={mostViewedBlog?.content as string}
            image={mostViewedBlog?.coverImage.fileUrl as string}
            id={mostViewedBlog?.id as string}
          />

          <ScrollArea className="h-[500px] w-full mt-10 md:mt-0 md:w-1/2 shadow-xl">
            <div className="flex-col flex gap-5 ">
              {listBlog.map((item, index) => (
                <ItemNews
                  key={index}
                  title={item.title}
                  description={item.content}
                  image={item.coverImage.fileUrl}
                  id={item.id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex justify-center pb-5 mt-10">
        <Button
          variant="outline"
          onClick={() => push('/blog')}
          className="px-6 rounded-none"
        >
          View all
        </Button>
      </div>
    </section>
  )
}
export default BlogSection

const BigNews = ({
  title,
  description,
  image,
  id,
}: {
  title: string
  description: string
  image: string
  id: string
}) => {
  return (
    <div className="relative rounded-md p-3 overflow-hidden border  border-opacity-45 shadow-xl backdrop-blur-md md:w-1/2 ">
      <p className="absolute top-4 left-4 bg-red-600 px-5 py-1 text-white rounded drop-shadow-md">
        Trend
      </p>
      <div className="h-[200px] sm:h-[300px] w-full ">
        <Image
          className="w-full h-full object-cover rounded"
          width={1000}
          height={1000}
          src={image}
          alt={title}
        />
      </div>
      <div className="mt-5 flex flex-col gap-3 p-3">
        <Link
          href={`/blog/${id}`}
          className="text-2xl font-semibold relative after:absolute after:left-0 w-fit  after:bg-primary after:bottom-1 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 cursor-pointer line-clamp-1"
        >
          {title}
        </Link>

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
          {description.slice(0, 200) + '...'}
        </ReactMarkdown>
      </div>
    </div>
  )
}

const ItemNews = ({
  title,
  description,
  image,
  id,
}: {
  title: string
  description: string
  image: string
  id: string
}) => {
  return (
    <div className="relative rounded-md p-3 overflow-hidden border border-opacity-45 flex backdrop-blur-md shadow-lg">
      <p className="absolute top-2 right-3 bg-red-600 px-2 py-1 text-white rounded drop-shadow-md text-xs z-10">
        New
      </p>
      <div className=" aspect-square h-[100px] sm:h-[150px] md:h-[100px]">
        <Image
          className="w-full h-full object-cover rounded"
          width={200}
          height={200}
          src={image}
          alt={title}
        />
      </div>
      <div className={`flex flex-col gap-2 ml-3`}>
        <Link
          href={`/blog/${id}`}
          className="text-2xl font-semibold relative after:absolute after:left-0 w-fit  after:bg-primary after:bottom-1 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 cursor-pointer line-clamp-1"
        >
          {title}
        </Link>
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
          {description.slice(0, 150) + '...'}
        </ReactMarkdown>
      </div>
    </div>
  )
}
