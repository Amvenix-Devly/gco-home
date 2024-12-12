/* eslint-disable @next/next/no-img-element */
'use client'

import Logo from '@/components/shared/Logo'
import { cn } from '@/lib/utils'
import { ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import { navigationData } from './Data'

const DesktopNav = () => {
  return (
    <nav className="md:block container hidden py-1">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center ">
          <Logo className="w-[150px]" />
          <div className="flex flex-row gap-5 ">
            {navigationData.map((navItem, index) => (
              <NavItem key={index} path={navItem.path} title={navItem.title}>
                {navItem.submenu && (
                  <div className="flex justify-between">
                    {navItem.submenu.map((submenuItem, idx) => (
                      submenuItem.title !== 'Image Boxes' ? (
                        <NavListItem
                          key={idx}
                          path={submenuItem.path as string}
                          title={submenuItem.title}
                        >
                          {submenuItem.items &&
                            submenuItem.items.map((item, subIdx) => (
                              <LinkItem
                                key={subIdx}
                                path={item.path}
                                title={item.title}
                              />
                            ))}
                        </NavListItem>
                      ) : null
                    ))}
                    {navItem.submenu
                      .filter((submenuItem) => submenuItem.title === 'Image Boxes')
                      .flatMap((imageBoxItem) =>
                        imageBoxItem.items.map((imgItem, imgIdx) => (
                          <ImageBox
                            key={imgIdx}
                            title={imgItem.title}
                            src={'src' in imgItem ? imgItem.src : ''}
                            linkTitle={'linkTitle' in imgItem ? imgItem.linkTitle : ''}
                            path={imgItem.path}
                          />
                        ))
                      )}
                  </div>
                )}
              </NavItem>
            ))}
          </div>
        </div>
        <div>
          <div className="flex border py-2 px-3 items-center rounded-[2px]">
            <input
              className="w-[150px] outline-none border-none appearance-none bg-transparent placeholder:text-sm"
              placeholder="Search..."
              type="text"
            />
            <Search className="size-4" />
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
    <div className="desktopLink">
      <Link
        className="flex gap-1 items-center uppercase h-12 border-b border-b-transparent hover:border-b-white z-50 relative opacity-90 hover:opacity-100 font-light"
        href={path}
      >
        {title}
        {children && <ChevronDown className="size-4" />}
      </Link>
      {children && (
        <div
          className="absolute top-[80%]  bg-opacity-80 w-screen left-0 desktopLinkContent opacity-0 z-40 pointer-events-none transition-opacity duration-300 ease-in-out"
        >
          <div className="bg-black bg-opacity-80 mt-[12px] h-[300px] overflow-x-auto">
            <div className="container px-10 py-8 ">{children}</div>
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
          'text-xl underline underline-offset-[20px] capitalize  opacity-80 hover:opacity-100 hover:drop-shadow-lg hover:shadow-white',
          className
        )}
        href={path}
      >
        {title}
      </Link>
      {children && (
        <div className="flex flex-col mt-10 gap-5 ml-5">{children}</div>
      )}
    </div>
  )
}

const LinkItem = ({ path, title }: { path: string; title: string }) => {
  return (
    <Link className="opacity-80 hover:opacity-100 capitalize" href={path}>
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
    <div className="ml-5 mt-3 w-[24vw] max-w-[300px]">
      <div className="aspect-square ">
        <img
          className="h-full w-full object-cover"
          width={500}
          height={500}
          src={src}
          alt={title}
        />
      </div>
      <h1 className="text-sm mt-3">{title}</h1>
      <Link className="text-sm underline" href={path}>
        {linkTitle}
      </Link>
    </div>
  )
}

export default DesktopNav
