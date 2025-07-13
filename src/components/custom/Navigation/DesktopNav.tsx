/* eslint-disable @next/next/no-img-element */
'use client'

import Logo from '@/components/shared/Logo'
import { cn } from '@/lib/utils'
import { ChevronDown, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ItemWithImage = ({
  title,
  path,
  imgSrc,
  className,
}: {
  title: string
  path: string
  imgSrc: string
  className?: string
}) => {
  return (
    <Link
      className={cn(
        'aspect-square w-60 bg-blue-800 relative rounded overflow-hidden flex justify-center items-center group',
        className
      )}
      href={path}
    >
      <Image
        className='absolute top-0 left-0 right-0 bottom-0 object-cover size-full group-hover:brightness-[80%] transition duration-300'
        width={100}
        height={100}
        src={imgSrc}
        alt='nav image'
      />
      <h1 className='font-black uppercase relative z-10 text-3xl text-center text-black bg-white bg-opacity-35 w-full py-2 mx-2 rounded backdrop-blur-md dark:bg-black dark:bg-opacity-50 dark:text-white'>
        {title}
      </h1>
    </Link>
  )
}

const DesktopNav = ({
  annulLinks,
}: {
  annulLinks: {
    title: string
    id: number
    url: string
  }[]
}) => {
  return (
    <nav className='md:block container hidden py-1'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center '>
          <Logo className='w-[150px] h-[48px]' />
          <div className='flex flex-row  gap-3 xl:gap-5'>
            <NavItem title='Home' path='/' />
            <NavItem title='About Us' path='#'>
              <div className='flex justify-center gap-10 w-full mt-3'>
                <ItemWithImage
                  className='bg-zinc-700 bg-opacity-40'
                  title='About GCO'
                  path='/about'
                  imgSrc='/logo_sq.png'
                />
                <ItemWithImage
                  className='bg-zinc-700 bg-opacity-40'
                  title='Our Team'
                  path='/about/team'
                  imgSrc='/img/desktopnav/about/team.jpg'
                />
                <ItemWithImage
                  className='bg-zinc-700 bg-opacity-40'
                  title='Our Strength'
                  path='/about/strength'
                  imgSrc='/img/desktopnav/about/stength.jpg'
                />
                <div className='aspect-square w-60 bg-black bg-opacity-25 p-3 rounded backdrop-blur-md'>
                  <p className='font-bold text-xl'>Our Impact</p>
                  {annulLinks.map((link) => (
                    <div className='ml-3 mt-1' key={link.id}>
                      <Link href={link?.url} className='hover:underline'>
                        {link?.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </NavItem>
            <NavItem title='NEWS & STORIES' path='#'>
              <div className='flex justify-center gap-10 w-full mt-3'>
                <ItemWithImage
                  title='Social media'
                  path='#social'
                  imgSrc='/img/desktopnav/news/social.jpg'
                />
                <ItemWithImage
                  title='Blogs'
                  path='/blog'
                  imgSrc='/img/desktopnav/news/blog.jpg'
                />
                <ItemWithImage
                  title='Videos'
                  path='/about/videos'
                  imgSrc='/img/desktopnav/news/vidio.jpg'
                />
                <ItemWithImage
                  className='text-black'
                  title='Gallery'
                  path='/about/photo-gallery'
                  imgSrc='/img/desktopnav/news/gallary.jpg'
                />
              </div>
            </NavItem>

            <NavItem title='Get Involved' path='#'>
              <div className='flex justify-center gap-10 w-full mt-3'>
                <ItemWithImage
                  title='Businesses'
                  path='/get-involved/business'
                  imgSrc='/img/desktopnav/cor.jpg'
                />
                <ItemWithImage
                  title='Individuals'
                  path='/get-involved/individuals'
                  imgSrc='/img/desktopnav/ind.jpg'
                />
                <ItemWithImage
                  title='Schools'
                  path='/get-involved/schools'
                  imgSrc='/img/desktopnav/stu.jpg'
                />
              </div>
            </NavItem>
            <NavItem title='What we do' path='#'>
              <div className='flex justify-center gap-5 w-full mt-1 flex-wrap'>
                <ItemWithImage
                  title='Climate action'
                  path='/what-we-do#climate action'
                  imgSrc='/img/desktopnav/whatwedo/climetaction.jpg'
                />
                <ItemWithImage
                  title='Health'
                  path='/what-we-do#health'
                  imgSrc='/img/desktopnav/whatwedo/health.jpg'
                />
                <ItemWithImage
                  title='Food Security'
                  path='/what-we-do#Food Security'
                  imgSrc='/img/desktopnav/whatwedo/food.jpg'
                />
                <ItemWithImage
                  title='Human Rights'
                  path='/what-we-do#Human Rights'
                  imgSrc='/img/desktopnav/whatwedo/human.jpg'
                />
                <ItemWithImage
                  title='Events'
                  path='/what-we-do#events'
                  imgSrc='/img/desktopnav/whatwedo/event.jpg'
                />
                <ItemWithImage
                  title='Campaigns'
                  path='/what-we-do#campaigns'
                  imgSrc='/img/desktopnav/whatwedo/campain.png'
                />
                <ItemWithImage
                  title='Training'
                  path='/what-we-do#training'
                  imgSrc='/img/desktopnav/whatwedo/training.jpg'
                />
              </div>
            </NavItem>
            <NavItem title='Projects' path='#'>
              <div className='flex gap-10 flex-wrap'>
                <div className='flex justify-center gap-5 w-full mt-1 flex-wrap'>
                  <ItemWithImage
                    title='Completed Project'
                    path='/project/complete-project'
                    imgSrc='/img/desktopnav/cor.jpg'
                  />
                  <ItemWithImage
                    title='On Going Project'
                    path='/project/on-going-project'
                    imgSrc='/img/desktopnav/ind.jpg'
                  />
                  <ItemWithImage
                    title='Event'
                    path='/project/events'
                    imgSrc='/img/desktopnav/whatwedo/event.jpg'
                  />
                  <ItemWithImage
                    title='Training'
                    path='/project/training'
                    imgSrc='/img/desktopnav/training.jpg'
                  />
                  <ItemWithImage
                    title='Up coming program'
                    path='/project/up-comeing-project'
                    imgSrc='/img/desktopnav/upproject.jpg'
                  />
                </div>
              </div>
            </NavItem>
          </div>
        </div>

        <div>
          <div className='flex border py-2 px-3 items-center rounded-[2px]'>
            <input
              className='w-[150px] outline-none border-none appearance-none bg-transparent placeholder:text-sm'
              placeholder='Search...'
              type='text'
            />
            <Search className='size-4' />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({
  children,
  title,
  path,
}: {
  children?: React.ReactNode
  title: String
  path: string
}) => {
  return (
    <div className='desktopLink'>
      <Link
        className='flex gap-1 items-center uppercase h-12 border-b border-b-transparent hover:border-b-white z-50 relative opacity-90 hover:opacity-100 font-light text-center text-sm xl:text-base'
        href={path}
      >
        {title}
        {children && <ChevronDown className='size-4' />}
      </Link>
      {children && (
        <div className='absolute top-[80%]  bg-opacity-80 w-screen left-0 desktopLinkContent opacity-0 z-40 pointer-events-none transition-opacity duration-300 ease-in-out'>
          <div className='bg-black bg-opacity-80 mt-[12px] h-[300px] overflow-x-auto scrollbar'>
            <div className='container px-10 py-3 '>{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}

const NavListItem = ({
  children,
  title,
  path,
  className,
}: {
  children?: React.ReactNode
  title: String
  path: string
  className?: string
}) => {
  return (
    <div>
      <Link
        className={cn(
          'text-xl underline underline-offset-[10px] capitalize  opacity-80 hover:opacity-100 hover:drop-shadow-lg hover:shadow-white',
          className
        )}
        href={path}
      >
        {title}
      </Link>
      {children && (
        <div className='flex flex-col mt-5 gap-3 ml-5'>{children}</div>
      )}
    </div>
  )
}

const LinkItem = ({ path, title }: { path: string; title: string }) => {
  return (
    <Link className='opacity-80 hover:opacity-100 capitalize' href={path}>
      {title}
    </Link>
  )
}

const ImageBox = ({
  title,
  src,
  path = '#',
  linkTitle = 'this is link title',
}: any) => {
  return (
    <div className='ml-5 mt-3 w-[24vw] max-w-[300px]'>
      <div className='aspect-square '>
        <img
          className='h-full w-full object-cover'
          width={500}
          height={500}
          src={src}
          alt={title}
        />
      </div>
      <h1 className='text-sm mt-3'>{title}</h1>
      <Link className='text-sm underline' href={path}>
        {linkTitle}
      </Link>
    </div>
  )
}

export default DesktopNav
