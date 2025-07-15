'use client'
import {
  SweetchLayoutContent,
  SweetchLayoutSidebar,
  Switch,
  SwitchLayoutParant,
} from '@/components/shared/SwitchLayout'

import { cn } from '@/lib/utils'
import { Facebook, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type TeamData = {
  [key: string]: {
    name: string
    position: string
    image: any
  }[]
}

type Member = {
  id: number
  title: string
  name: string
  imageUrl: string | null
  phone: string | null
  email: string | null
  facebook: string | null
  previous: boolean
}

type MemberType = {
  id: number
  title: string
  Member: Member[]
}

type TeamComponentProps = {
  members?: MemberType[]
}

const TeamComponent = ({ members = [] }: TeamComponentProps) => {
  // Use only database data - filter out member types that have all previous members
  const memberTypes = members.filter((type) =>
    type.Member.some((member) => !member.previous)
  )

  const [active, setActive] = useState('')

  // Get current members based on selection - only use database data
  const getCurrentMembers = () => {
    const selectedType = members.find((type) => type.title === active)
    return selectedType
      ? selectedType.Member.filter((member) => !member.previous)
      : []
  }

  // Get previous members - only use database data
  const getPreviousMembers = () => {
    const allPreviousMembers: Member[] = []
    members.forEach((type) => {
      const previousMembers = type.Member.filter((member) => member.previous)
      allPreviousMembers.push(...previousMembers)
    })
    return allPreviousMembers
  }

  // Get type title helper
  const getTypeTitle = (type: MemberType): string => {
    return type.title
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const hash = decodeURI(window.location.hash?.split('#')[1] || '')

    if (hash && memberTypes.length > 0) {
      const validType = memberTypes.some((type) => getTypeTitle(type) === hash)

      if (validType) {
        setActive(hash)
      } else {
        setActive(getTypeTitle(memberTypes[0]))
      }
    } else if (memberTypes.length > 0) {
      setActive(getTypeTitle(memberTypes[0]))
    }
  }, [members, memberTypes])

  return (
    <>
      <div className='bg-green-500'>
        <h1 className='text-center text-4xl p-3'>MEET THE TEAM</h1>
      </div>
      <section className='container'>
        {memberTypes.length > 0 ? (
          <SwitchLayoutParant className='mt-5'>
            <SweetchLayoutSidebar>
              {memberTypes.map((type) => {
                const title = getTypeTitle(type)
                return (
                  <Switch
                    key={title}
                    className='text-start capitalize'
                    active={active === title}
                    onClick={() => {
                      window.location.hash = title
                      setActive(title)
                    }}
                  >
                    {title}
                  </Switch>
                )
              })}
            </SweetchLayoutSidebar>
            <SweetchLayoutContent className='p-0'>
              <div className='flex flex-wrap'>
                {getCurrentMembers().map((item: any, index: number) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
            </SweetchLayoutContent>
          </SwitchLayoutParant>
        ) : (
          <div className='mt-5 text-center py-10'>
            <p className='text-lg text-gray-600'>
              No member data available. Please add members to the database.
            </p>
          </div>
        )}

        {getPreviousMembers().length > 0 && (
          <div className=''>
            <h1 className='text-xl text-center'>PREVIOUS BOARD MEMBER</h1>
            <div className=' block sm:flex flex-wrap mt-5 mb-10  justify-center items-center'>
              {getPreviousMembers().map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  className='md:w-[calc(100%/5)] sm:w-[50%] w-full'
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

const ItemCard = ({ item, className }: any) => {
  // Handle both static data format and database data format
  const name = item.name
  const position = item.position || item.title
  const image = item.image || item.imageUrl || '/placeholder-image.jpg'
  const phone = item.phone
  const email = item.email
  const facebook = item.facebook

  return (
    <div
      className={cn(
        'aspect-square md:w-[33.3333%] sm:w-[50%] w-full rounded-sm p-4 group/item',
        className
      )}
    >
      <div className='flex justify-center items-center flex-col h-full bg-opacity-90 rounded-lg bg-primary'>
        <div className='w-full flex justify-center items-center'>
          {image && image !== '/placeholder-image.jpg' ? (
            <Image
              alt={name}
              src={image}
              height={200}
              width={200}
              className='rounded-full w-1/2'
            />
          ) : (
            <div className='w-1/2 aspect-square bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl font-bold'>
              {name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <a
          href='#'
          className='font-bold text-xl mt-2 text-white text-center hover:text-black transition-colors uppercase '
        >
          {name}
        </a>
        <p className='font-normal text-white text-center mt-1 uppercase'>
          {position}
        </p>
        <div className='flex gap-2 mt-2 hover:*:text-black'>
          {phone && (
            <a href={`tel:${phone}`}>
              <Phone className='size-4' />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <Mail className='size-4' />
            </a>
          )}
          {facebook && (
            <a href={facebook} target='_blank' rel='noopener noreferrer'>
              <Facebook className='size-4' />
            </a>
          )}
          {!phone && !email && !facebook && (
            <>
              <a href='#'>
                <Phone className='size-4' />
              </a>
              <a href='#'>
                <Mail className='size-4' />
              </a>
              <a href='#'>
                <Facebook className='size-4' />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamComponent
