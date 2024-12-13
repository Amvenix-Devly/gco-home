'use client'

import Slider from 'react-slick'
import image1 from '@/img/donor/Bangladesh-Forestry-Ministry.png'
import image2 from '@/img/donor/Bondhu-Nursery-logo-1024x1024.png'
import image3 from '@/img/donor/Department-of-Environment-logo.png'
import image4 from '@/img/donor/GlobalGiving.png'
import image5 from '@/img/donor/ICT-Ministry-logo.jpg'
import image6 from '@/img/donor/MOEF-logo.jpg'
import image7 from '@/img/donor/One-Tree-Planted-logo-1024x683.jpg'
import image8 from '@/img/donor/microsoft-logo.jpg'
import image9 from '@/img/donor/nsbd.jpeg'
import Image from 'next/image'
import '@/styles/donar.css'

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
]

const SlideItem = ({ src }: any) => {
  return (
    <div className="size-40 rounded-md overflow-hidden mx-auto">
      <Image
        className="size-28 object-contain rounded-md bg-white"
        src={src}
        alt="logos"
      />
    </div>
  )
}

const DonarAndCo = () => {
  var settings = {
    dots: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 2,
    arrows: false,
    autoplay: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }
  return (
    <section className="container my-10">
      <h1 className="text-center !text-2xl font-semibold md:!text-3xl">
        Donor & Collaborators
      </h1>

      <div className="mt-10 mx-0 md:mx-0 xl:mx-0">
        <Slider {...settings} className="">
          {images.map((img, index) => (
            <SlideItem key={index} src={img} />
          ))}
        </Slider>
      </div>
    </section>
  )
}
export default DonarAndCo
