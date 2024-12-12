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
          {!activeImages?.length ? (
            <div className="flex flex-col items-center justify-center h-[400px] w-full">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No images found</p>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {activeImages?.map((item: any, index: number) => (
                <div
                  className="aspect-square md:w-[33.3333%] sm:w-[50%] w-full rounded-sm p-4 group/item"
                  key={index}
                >
                  <Image
                    src={item?.coverImage?.fileUrl}
                    width={200}
                    height={200}
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
          )}
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
