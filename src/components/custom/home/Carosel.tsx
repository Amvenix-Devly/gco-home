'use client'
// import { TextAnimate } from '@/components/ui/aimate/TextAnimate'
import img2 from '@/img/carosel/cur1.jpg'
import img3 from '@/img/carosel/cur2.jpg'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import Slider from 'react-slick'


// const Slider = dynamic(() => import('react-slick'), { ssr: false })


const SlideItem = ({ src, inview, text }: any) => {
  return (
    <div className="h-[300px] sm:h-[350px] md:h-[500px] xl:h-[550px] overflow-hidden relative">
      {inview && (
        <section className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="!text-black text-4xl font-bold md:text-5xl">{text}</h1>
        </section>
      )}
      <Image
        className={`h-full w-full object-cover transition-all duration-2500 ease-in-out  ${
          inview ? 'scale-110' : 'scale-100'
        }`}
        src={src}
        alt="Picture of the author"
        width={600}
        height={600}
       
      />
    </div>
  )
}

function SimpleSlider() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const [currentPos, setCurrentPos] = useState(0)
  return (
    <div className="slider-container container !p-0">
      <Slider {...settings} afterChange={(x) => setCurrentPos(x)}>
        <SlideItem
          src={img2}
          inview={currentPos === 0}
          text="One Tree for One Child."
        />
        <SlideItem src={img3} inview={currentPos === 1} text="" />
      </Slider>
    </div>
  )
}

export default SimpleSlider
