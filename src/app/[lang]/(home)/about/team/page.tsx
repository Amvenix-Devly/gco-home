'use client'
import {
  SweetchLayoutContent,
  SweetchLayoutSidebar,
  Switch,
  SwitchLayoutParant,
} from '@/components/shared/SwitchLayout'
import Afia from '@/img/pagesImage/team/Afia-photo-1.png'
import AminNulImage from '@/img/pagesImage/team/Aminul-Islam-.jpg'
import Mashud from '@/img/pagesImage/team/ExclusiveMember/mashud.jpg'
import Shahin from '@/img/pagesImage/team/ExclusiveMember/shahi.jpg'
import Shamim from '@/img/pagesImage/team/ExclusiveMember/Shamim.png'
import Najmul from '@/img/pagesImage/team/Nizhum-Photo-2.jpg'
import Zihanur from '@/img/pagesImage/team/ExclusiveMember/jihanur.jpg'
import Kamrun from '@/img/pagesImage/team/ExclusiveMember/kamrun.png'
import May from '@/img/pagesImage/team/ExclusiveMember/may.png'
import Ozair from '@/img/pagesImage/team/ExclusiveMember/ozair.jpg'
import Samim from '@/img/pagesImage/team/ExclusiveMember/Shamim.png'
import Af from '@/img/pagesImage/team/tagyExclusive/af.jpg'
import bad from '@/img/pagesImage/team/tagyExclusive/bad.png'
import rof from '@/img/pagesImage/team/tagyExclusive/rof.png'
import Image from 'next/image'
import MRIDHA from '@/img/pagesImage/team/amin.jpg'
import MALEK from '@/img/pagesImage/team/kh.jpg'
import SHOWKAT from '@/img/pagesImage/team/mir.jpg'
import { useEffect, useState } from 'react'
import { Facebook, Mail, Phone } from 'lucide-react'

type TeamData = {
  [key: string]: {
    name: string
    position: string
    image: any
  }[]
}

const data: TeamData = {
  'BOARD OF DIRECTOR': [
    {
      name: 'Aminul Islam',
      position: 'Chairman',
      image: AminNulImage,
    },
    {
      name: 'NIZHUM RAHMAN',
      position: 'SECRETARY',
      image: Najmul,
    },
    {
      name: 'AFIA SUMI',
      position: 'TREASURER',
      image: Afia,
    },
  ],
  'EXECUTIVE MEMBER': [
    {
      name: 'Aminul Islam',
      position: 'Chairman',
      image: AminNulImage,
    },
    {
      name: 'MD. SHAHINUR ISLAM',
      position: 'VICE PRESIDENT',
      image: Shahin,
    },
    {
      name: 'MD. MASUD RANA',
      position: 'SECRETARY GENERAL',
      image: Mashud,
    },
    {
      name: 'MD. SHAMIM ALI',
      position: 'JOINT SECRETARY',
      image: Shamim,
    },
    {
      name: 'ZIHANUR RAHMAN',
      position: 'FINANCE SECRETARY',
      image: Zihanur,
    },
    {
      name: 'MST.KAMRUN NAHER',
      position: 'ORGANIZING SECRETARY',
      image: Kamrun,
    },
    {
      name: 'OZAIR BIN OBAIDA',
      position: 'PUBLICATION SECRETARY',
      image: Ozair,
    },
    {
      name: 'MST. SAMMI KHATUN',
      position: 'EXECUTIVE MEMBER',
      image: Samim,
    },
    {
      name: 'MD. MAYMUR',
      position: 'EXECUTIVE MEMBER',
      image: May,
    },
  ],
  'ADVISER COUNCIL': [
    {
      name: 'AMIN UDDIN MRIDHA',
      position: 'CHIEF ADVISER',
      image: MRIDHA,
    },
    {
      name: 'KH MALEK',
      position: 'ADVISER',
      image: MALEK,
    },
    {
      name: 'MIR SHOWKAT ALI',
      position: 'ADVISER',
      image: SHOWKAT,
    },
  ],
  'GCO STAFF': [
    {
      name: 'Aminul Islam',
      position: 'Chairman',
      image: AminNulImage,
    },
    {
      name: 'NIZHUM RAHMAN',
      position: 'SECRETARY',
      image: Najmul,
    },
    {
      name: 'SHAHID AHMED',
      position: 'CO ORDINATOR',
      image: require('@/img/pagesImage/team/stafmember/Shahid-photo.png')
        .default,
    },
    {
      name: 'RONI ISLAM',
      position: 'ACCOUNTANT',
      image: require('@/img/pagesImage/team/stafmember/Roni-photo-2.jpg')
        .default,
    },
    {
      name: 'MD. MASUD RANA',
      position: 'PROJECT OFFICER',
      image: require('@/img/pagesImage/team/stafmember/mashud.jpg').default,
    },
    {
      name: 'AFTABUL ALOM RAIHAN',
      position: 'PROJECT DEV. MANAGER',
      image: require('@/img/pagesImage/team/stafmember/af.jpg').default,
    },
    {
      name: 'MST SALMA KHATUN',
      position: 'SURVERY OFFICER',
      image: require('@/img/pagesImage/team/stafmember/Salma-khatun-photo.png')
        .default,
    },
    {
      name: 'MAHFUZ AHMED',
      position: 'SURVERY OFFICER',
      image: require('@/img/pagesImage/team/stafmember/2.png').default,
    },
    {
      name: 'JUBAYER AMIN',
      position: 'SURVERY OFFICER',
      image: require('@/img/pagesImage/team/stafmember/jub.jpg').default,
    },
  ],
  'TYAGI EXECUTIVE': [
    {
      name: 'Aminul Islam',
      position: 'PRESIDENT',
      image: AminNulImage,
    },
    {
      name: 'MD. MASUD RANA',
      position: 'VICE PRESIDENT',
      image: Mashud,
    },
    {
      name: 'AFTABUL ALOM RAIHAN',
      position: 'VICE PRESIDENT',
      image: Af,
    },
    {
      name: 'MAHFUZ KARIM BADHON',
      position: 'VICE PRESIDENT',
      image: bad,
    },
    {
      name: 'ABDUR ROUF KHAN',
      position: 'GENAREL SECRETARY',
      image: rof,
    },
    {
      name: 'MD. MAYMUR',
      position: 'JOINT GENAREL SECRETARY',
      image: require('@/img/pagesImage/team/tagyExclusive/my.png').default,
    },
    {
      name: 'MD MAHFUZ AHMED',
      position: 'JOINT GENAREL SECRETARY',
      image: require('@/img/pagesImage/team/tagyExclusive/2.png').default,
    },
    {
      name: 'MD ZUBAER AMIN',
      position: 'ORGANIZING SECRETARY',
      image: require('@/img/pagesImage/team/tagyExclusive/zub.jpg').default,
    },
    {
      name: 'ZIHANUR RAHMAN',
      position: 'FINANCE SECRETARY',
      image: require('@/img/pagesImage/team/tagyExclusive/zi.jpg').default,
    },
    {
      name: 'MD RABBY',
      position: 'PUBLICATION SECRETARY',
      image: require('@/img/pagesImage/team/tagyExclusive/rab.jpg').default,
    },
    {
      name: 'MST. TONIMA ISLAM',
      position: 'EXECUTIVE MEMBER',
      image: require('@/img/pagesImage/team/tagyExclusive/toni.jpg').default,
    },
    {
      name: 'MD. SHADIN',
      position: 'EXECUTIVE MEMBER',
      image: require('@/img/pagesImage/team/tagyExclusive/sha.png').default,
    },
  ],
}

const Keys = Object.keys(data)

const TeamPage = () => {
  const [active, setActive] = useState(Keys[0])
  useEffect(() => {
    window.scrollTo(0, 0)
    const x = decodeURI(
      window.location.hash?.split('#')[1]
        ? window.location.hash?.split('#')[1]
        : Keys[0]
    )
    setActive(x)
  }, [])
  return (
    <>
      <div className="bg-green-500">
        <h1 className="text-center text-4xl p-3">MEET THE TEAM</h1>
      </div>
      <section className="container">
        <SwitchLayoutParant className="mt-5">
          <SweetchLayoutSidebar>
            {Keys.map((key) => (
              <Switch
                key={key}
                className="text-start capitalize"
                active={active === key}
                onClick={() => {
                  window.location.hash = key
                  setActive(key)
                }}
              >
                {key}
              </Switch>
            ))}
          </SweetchLayoutSidebar>
          <SweetchLayoutContent className="p-0">
            <div
              className="flex flex-wrap"
    
              
            >
              {data[active]?.map((item: any, index: number) => (
                <ItemCard key={index} item={item} />
              ))}
            </div>
          </SweetchLayoutContent>
        </SwitchLayoutParant>
      </section>
    </>
  )
}

const ItemCard = ({ item }: any) => {
  return (
    <div
      className="aspect-square md:w-[33.3333%] sm:w-[50%] w-full rounded-sm p-4 group/item"

    >
      <div className="flex justify-center items-center flex-col h-full bg-opacity-90 rounded-lg bg-primary">
        <div

          className="w-full flex justify-center items-center"
        >
          <Image
            alt={item.name}
            src={item.image}
            height={200}
            width={200}
            className="rounded-full w-1/2"
            placeholder='blur'
          />
        </div>
        <a
          href="#"
          className="font-bold text-xl mt-2 text-white text-center hover:text-black transition-colors uppercase "
        >
          {item.name}
        </a>
        <p className="font-normal text-white text-center mt-1 uppercase">
          {item.position}
        </p>
        <div className="flex gap-2 mt-2 hover:*:text-black">
          <a href="#">
            <Phone className="size-4" />
          </a>
          <a href="#">
            <Mail className="size-4" />
          </a>
          <a href="#">
            <Facebook className="size-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TeamPage
