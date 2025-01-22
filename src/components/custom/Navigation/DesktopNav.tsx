/* eslint-disable @next/next/no-img-element */
'use client'

import Logo from '@/components/shared/Logo'
import { cn } from '@/lib/utils'
import { ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'

const DesktopNav = () => {
  return (
    <nav className="md:block container hidden py-1">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center ">
          <Logo className="w-[150px] h-[48px]" />
          <div className="flex flex-row  gap-3 xl:gap-5">
            <NavItem title="Home" path="/" />
            
            <NavItem title="About Us" path="#">
              <div className="flex justify-around flex-wrap">
                <NavListItem title="Our Organization" path="/about">
                  <LinkItem title="About GCO" path="/about#about" />
                  <LinkItem title="Mission vision" path="/about#mission" />
                  <LinkItem title="History of GCO" path="/about#histry" />
                </NavListItem>
                <NavListItem title="Our Team" path="/about/team">
                  <LinkItem title="Board Of Director" path="/about/team#BOARD OF DIRECTOR" />
                  <LinkItem title="Executive Member" path="/about/team#EXECUTIVE MEMBER" />
                  <LinkItem title="Adviser Council" path="/about/team#ADVISER COUNCIL" />
                  <LinkItem title="Gco Staff" path="/about/team#GCO STAFF" />
                  <LinkItem title="Tyagi Executive" path="/about/team#TYAGI EXECUTIVE" />
                </NavListItem>
                <NavListItem title="Our Strength" path="/about/strength">
                  <LinkItem title="Tyagi volunteer" path="/about/strength#tyagiVolunteer" />
                  <LinkItem title="Tyagi foundation" path="/about/strength#tyagiFoundation" />
                  <LinkItem title="Tyagi research center" path="/about/strength#tyagiResearchCenter" />
                  <LinkItem title="Tyagi enterprise" path="/about/strength#tyagiEnterprise" />
                  <LinkItem title="Global nation" path="/about/strength/globalNation" />
                  <LinkItem title="GCO Nursery" path="/about/strength#gcoNursery" />
                  <LinkItem title="treelanching" path="/about/strength#treelanching" />
                </NavListItem>
                <NavListItem title="Our Impact" path="#">
                  <LinkItem title="Annual report 2023" path="/api/report2023" />
                </NavListItem>
              </div>
            </NavItem>

            <NavItem title="NEWS & STORIES" path="#">
              <div className="flex justify-between flex-wrap">
                <NavListItem title="NEWS & STORIES" path="#">
                  <LinkItem title="Social media" path="#" />
                  <LinkItem title="News" path="#" />
                  <LinkItem title="Stories" path="#" />
                  <LinkItem title="Vidios" path="/about/videos" />
                  <LinkItem title="Gallary" path="/about/photo-gallery" />
                </NavListItem>
              </div>
            </NavItem>

            <NavItem title="Get Involved" path="#">
              <div className="flex gap-10 flex-wrap">
                <NavListItem title="Businesses" path="#">
                  <LinkItem title="Become A Partner" path="#" />
                  <LinkItem title="Partners" path="#" />
                  <LinkItem title="Cryptocurrency" path="#" />
                  <LinkItem title="Sports Sustainability" path="#" />
                </NavListItem>
                <NavListItem title="Individuals" path="#">
                  <LinkItem title="Monthly Giving" path="#" />
                  <LinkItem title="Planned Giving" path="#" />
                  <LinkItem title="Become A Tree Ambassador" path="#" />
                  <LinkItem title="Teachers & Parents" path="#" />
                </NavListItem>
              </div>
            </NavItem>

            <NavItem title="What we do" path="#">
              <div className="flex gap-10 flex-wrap">
                <NavListItem title="Climate action" path="/what-we-do">
                  <LinkItem title="One tree for one child" path="/what-we-do" />
                  <LinkItem title="Save life from thunderstorms with plants" path="/what-we-do" />
                  <LinkItem title="Sponsor a tree for future child in Bangladesh" path="/what-we-do" />
                  <LinkItem title="Disaster Resilience and Relief Programs" path="/what-we-do" />
                </NavListItem>
                <NavListItem title="Health" path="/what-we-do">
                  <LinkItem title="Maternal and Child Health in Bangladesh Slums" path="/what-we-do" />
                  <LinkItem title="Maternal & Child Nutrition in Char Land, Bangladesh" path="/what-we-do" />
                </NavListItem>
                <NavListItem title="Food Security" path="/what-we-do">
                  <LinkItem title="Addressing Hunger Among Bangladesh's Elderly" path="/what-we-do" />
                  <LinkItem title="Abalamban – Self-Reliance" path="/what-we-do" />
                  <LinkItem title="Cluster Village Program" path="/what-we-do" />
                </NavListItem>
                <NavListItem title="Human Rights" path="/what-we-do">
                  <LinkItem title="Skill development program" path="/what-we-do" />
                </NavListItem>
                <NavListItem title="Our Events" path="/what-we-do">
                  <LinkItem title="Skill development program" path="/what-we-do" />
                </NavListItem>
              </div>
            </NavItem>

            <NavItem title="Where we do" path="#">
              <div className="flex justify-between flex-wrap">
                <NavListItem title="" path="#">
                  <LinkItem title="Bangladesh" path="#" />
                  <LinkItem title="Zimbabwe" path="#" />
                  <LinkItem title="Uganda" path="#" />
                </NavListItem>
              </div>
            </NavItem>
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
        className="flex gap-1 items-center uppercase h-12 border-b border-b-transparent hover:border-b-white z-50 relative opacity-90 hover:opacity-100 font-light text-center text-sm xl:text-base"
        href={path}
      >
        {title}
        {children && <ChevronDown className="size-4" />}
      </Link>
      {children && (
        <div
          className="absolute top-[80%]  bg-opacity-80 w-screen left-0 desktopLinkContent opacity-0 z-40 pointer-events-none transition-opacity duration-300 ease-in-out"
        >
          <div className="bg-black bg-opacity-80 mt-[12px] h-[300px] overflow-x-auto scrollbar">
            <div className="container px-10 py-3 ">{children}</div>
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
        <div className="flex flex-col mt-5 gap-3 ml-5">{children}</div>
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
