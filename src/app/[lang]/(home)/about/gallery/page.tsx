'use client'
import allListImage from '@/img/mightbe_deleted_Old-imageGallary/listImage'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

type DataType = {
  [key: string]: Array<any>
}

const data: DataType = {
  Nature: allListImage.slice(0, 10),
  Architecture: allListImage.slice(10, 15),
  Play: allListImage.slice(15, 20),
  cat: allListImage.slice(20, 26),
  ball: allListImage.slice(25, 28),
  Nature2: allListImage.slice(0, 10),
  Archite2cture: allListImage.slice(10, 15),
  P2lay: allListImage.slice(15, 20),
  c2at: allListImage.slice(20, 26),
  ba2ll: allListImage.slice(25, 28),
  Nature2s: allListImage.slice(0, 10),
  Arcshite2cture: allListImage.slice(10, 15),
  P2lsay: allListImage.slice(15, 20),
  c2ast: allListImage.slice(20, 26),
  bas2ll: allListImage.slice(25, 28),
}

const cat = Object.keys(data)

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(cat[0])
  const [open, setOpen] = useState(false)
  const [curentUrl, setCurrentUrl] = useState<StaticImageData>(
    data[selectedCategory][0]
  )
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[curentUrl]}
        // noScroll={{ disabled: false }}
        controller={{}}
        plugins={[Zoom]}
        render={{
          slide: NextJsImage,
          buttonNext: () => null,
          buttonPrev: () => null,
        }}
      />
      <h1 className="bg-primary text-white dark:text-black text-3xl text-center py-3">
        Gallary
      </h1>
      <section className="container mb-10">
        <div className="flex my-10 justify-center md:hidden">
          <div className="w-[98%] max-w-[450px] sm:max-w-[550px] flex">
            <button>
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex gap-3 overflow-auto scrollbar-none border-b dark:border-zinc-700 border-zinc-200 mx-2">
              {cat?.map((c, i) => (
                <button
                  onClick={() => setSelectedCategory(c)}
                  key={i}
                  className={cn(
                    'border-b-2 border-transparent pb-5 z-40 relative capitalize  px-2 opacity-55',
                    c === selectedCategory && 'border-primary opacity-100'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <button>
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
        <div className="md:flex md:items-start md:mt-10">
          <div className="hidden md:block w-[200px] mx-9 ">
            <div className="flex flex-col justify-start gap-2 border-r dark:border-zinc-700 border-zinc-200 ">
              {cat?.map((c, i) => (
                <button
                  onClick={() => setSelectedCategory(c)}
                  key={i}
                  className={cn(
                    'text-xl opacity-55 py-2 text-start hover:opacity-100',
                    c === selectedCategory &&
                      'border-r-2 border-primary opacity-100'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            
          </div>
          <div className="flex flex-wrap md:w-full justify-center  items-start md:justify-normal border dark:border-zinc-700 border-zinc-200 p-2 rounded-sm bg-black bg-opacity-10 shadow-2xl">
            {data[selectedCategory].map((img, i) => (
              <Image
                onClick={() => {
                  setCurrentUrl(img)
                  setOpen(true)
                }}
                key={img + i}
                alt="Preview"
                src={img}
                height={1000}
                width={1000}
                className="w-[calc(50%)]  sm:w-[calc(33.333333333%)] xl:w-[calc(25%)] p-3 object-cover aspect-square rounded-[3px] cursor-pointer hover:scale-105 transition-transform ease-in hover:brightness-125"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default GalleryPage

function isNextJsImage(slide: any) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === 'number' &&
    typeof slide.height === 'number'
  )
}

function NextJsImage({ slide, offset, rect }: any) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()

  const { currentIndex } = useLightboxState()

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  if (!isNextJsImage(slide)) return undefined

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  )
}
