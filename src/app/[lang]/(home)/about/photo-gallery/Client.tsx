/* eslint-disable @next/next/no-img-element */
'use client'
import {
  SweetchLayoutContent,
  SweetchLayoutSidebar,
  Switch,
  SwitchLayoutParant,
} from '@/components/shared/SwitchLayout'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const SwitChLayout = ({ allCat }: any) => {
  const [active, setActive] = useState(allCat[0].name)
  const [open, setOpen] = useState(false)
  const [activeUrl, setActiveUrl] = useState('')
  const activeImages = allCat.find(
    (item: any) => item.name === active
  )?.BlogPost
  console.log(activeImages)
  return (
    <>
      <SwitchLayoutParant className="mt-5">
        <SweetchLayoutSidebar>
          {allCat.map((item: any, i: any) => (
            <Switch
              key={i}
              className="text-start capitalize"
              active={active === item.name}
              onClick={() => {
                window.location.hash = item.name
                setActive(item.name)
              }}
            >
              {item.name}
            </Switch>
          ))}
        </SweetchLayoutSidebar>
        <SweetchLayoutContent className="p-0">
          <div className="flex flex-wrap">
            {activeImages?.map((item: any, index: number) => (
              <div
                className="aspect-square md:w-[33.3333%] sm:w-[50%] w-full rounded-sm p-4 group/item"
                key={index}
              >
                <Image
                  src={item?.coverImage?.fileUrl}
                  width={400}
                  height={400}
                  alt=""
                  onClick={() => {
                    setActiveUrl(item?.coverImage?.fileUrl)
                    setOpen(true)
                  }}
                  className="object-cover w-full h-full rounded-sm"
                />
              </div>
            ))}
          </div>
        </SweetchLayoutContent>
      </SwitchLayoutParant>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: activeUrl }]}
        render={{
          buttonNext: () => null,
          buttonPrev: () => null,
        }}
      />
    </>
  )
}

export default SwitChLayout
