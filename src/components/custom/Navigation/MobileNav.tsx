/* eslint-disable @next/next/no-img-element */
'use client'

import Logo from '@/components/shared/Logo'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileNav = ({
  annulLinks,
}: {
  annulLinks: {
    title: string
    id: number
    url: string
  }[]
}) => {
  const [mobileNav, setMobileNav] = useState(false)
  const path = usePathname()
  useEffect(() => {
    setMobileNav(false)
  }, [path])
  return (
    <nav className='md:hidden container flex justify-between items-center text-white h-10 relative'>
      <div className='flex fixed top-0 left-0 justify-between items-center text-white h-10 w-full px-[5px] bg-bgMain !z-50'>
        <button
          onClick={() => {
            setMobileNav((r) => !r)
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          {mobileNav ? <X /> : <Menu />}
        </button>
        <Logo className='w-[100px]' />
        <div className='flex items-center gap-2'>
          <button>
            <Search className='size-4' />
          </button>
          <button className='flex gap-1 items-center text-xs bg-white  text-bgMain hover:bg-bgMain hover:text-white h-10 px-2'>
            <ShoppingBag className='size-4' />0
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            initial={{
              opacity: 0,
            }}
            className='absolute top-full left-0 right-0 w-full bg-black bg-opacity-80 z-50 h-[calc(100vh-50px)] overflow-x-auto'
          >
            <div className='px-[20px] pb-10'>
              <div className='flex justify-center mt-3'>
                <Link
                  href='/donation'
                  className='bg-white text-black uppercase font-bold w-full  rounded-[2px] py-1'
                >
                  Donate
                </Link>
              </div>
              <div className='flex mt-3 w-full flex-col gap-5 text-stone-300'>
                <MobileNavItem title='Home' path='/' />
                <MobileNavItem title='About Us' path='#'>
                  <Child title='About GCO' path='/about' />
                  <Child title='Our Team' path='/about/team' />
                  <Child title='Our Strength' path='/about/strength' />
                  <Child title='Our Impact' path='#'>
                    {annulLinks.map((link) => (
                      <LinkItem
                        key={link.id}
                        title={link.title}
                        path={link.url}
                      />
                    ))}
                  </Child>
                </MobileNavItem>
                <MobileNavItem title='NEWS & STORIES' path='#'>
                  <Child title='Social media' path='#social' />
                  <Child title='Blogs' path='/blog' />
                  <Child title='Videos' path='/about/videos' />
                  <Child title='Gallery' path='/about/photo-gallery' />
                </MobileNavItem>
                <MobileNavItem title='Get Involved' path='#'>
                  <Child title='Businesses' path='/get-involved/business' />
                  <Child title='Individuals' path='/get-involved/individuals' />
                  <Child title='Schools' path='/get-involved/schools' />
                </MobileNavItem>
                <MobileNavItem title='What we do' path='#'>
                  <Child
                    title='Climate action'
                    path='/what-we-do#climate action'
                  />
                  <Child title='Health' path='/what-we-do#health' />
                  <Child
                    title='Food Security'
                    path='/what-we-do#Food Security'
                  />
                  <Child
                    title='Human Rights'
                    path='/what-we-do#Food Security'
                  />
                  <Child title='Events' path='/what-we-do#events' />
                </MobileNavItem>
                <MobileNavItem title='Projects' path='#'>
                  <Child
                    title='Completed Project'
                    path='/project/complete-project'
                  />
                  <Child
                    title='On Going Project'
                    path='/project/on-going-project'
                  />
                  <Child title='Event' path='/project/events' />
                  <Child title='Training' path='/project/training' />
                  <Child
                    title='Up Coming Project'
                    path='/project/up-comeing-project'
                  />
                </MobileNavItem>
                <LinkIndItem title='Contact' path='/contact-us' />
                <LinkIndItem title='Login' path='/join' />
                <LinkIndItem title='+8801760870070' path='#' />
                <LinkIndItem title='Newsleter' path='/newsletter' />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const LinkIndItem = ({ path, title }: { path: string; title: string }) => {
  return (
    <Link
      className='font-normal w-[80%] hover:opacity-65 text-lg uppercase'
      href={path}
    >
      {title}
    </Link>
  )
}

const MobileNavItem = ({ children, title = 'link 1', path = '#' }: any) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='flex flex-col items-center gap-1 w-ful mt-2'>
      <div className='flex justify-between w-full '>
        <Link
          className='font-normal w-[80%] hover:opacity-65 text-lg uppercase'
          href={path}
          onClick={() => {
            if (path === '#') {
              setOpen((r) => !r)
            }
          }}
        >
          {title}
        </Link>
        {children && (
          <button
            onClick={() => setOpen((r) => !r)}
            className='flex items-center'
          >
            <ChevronDown
              className={cn(
                'size-4 opacity-80 transition-transform',
                open && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>
      {open && children}
    </div>
  )
}

const Child = ({ children, title = 'asda', path = '#' }: any) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='w-full px-5'>
      <div className='flex justify-between w-full'>
        <Link
          className='font-normal w-[80%] hover:opacity-65 text-base uppercase mt-4'
          href={path}
        >
          {title}
        </Link>
        <button
          onClick={() => setOpen((r) => !r)}
          className='flex items-center'
        >
          <ChevronDown
            className={cn(
              'size-4 opacity-80 transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
      </div>
      {open && <div className='flex flex-col gap-2 mt-3 ml-4'>{children}</div>}
    </div>
  )
}

const LinkItem = ({
  title = 'Link 1',
  path = '#',
}: {
  title: string
  path: string
}) => {
  return <Link href={path}>{title}</Link>
}

const ImageBox = ({
  title,
  src,
  path = '#',
  linkTitle = 'this is link title',
}: any) => {
  return (
    <div className='ml-5 mt-3'>
      <div>
        <img
          className='h-full w-full object-cover'
          width={500}
          height={500}
          src={src}
          alt={title}
        />
      </div>
      <h1 className='text-sm'>{title}</h1>
      <Link className='text-sm underline' href={path}>
        {linkTitle}
      </Link>
    </div>
  )
}

export default MobileNav
