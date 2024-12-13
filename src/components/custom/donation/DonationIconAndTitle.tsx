'use client'
import { Aperture, Boxes, CircuitBoard, Crown, Trees } from 'lucide-react'
import Slider, { Settings } from 'react-slick'


var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
} as Settings

const DonationIconAndTitle = () => {
  return (
    <section>
      <div className="container py-24 md:pointer-events-none">
        <Slider {...settings}>
          <ItemDonation title="Donation" icon={<Aperture />} />
          <ItemDonation title="People" icon={<Boxes />} />
          <ItemDonation title="Donation" icon={<Trees />} />
          <ItemDonation title="People" icon={<CircuitBoard />} />
          <ItemDonation title="Top" icon={<Crown />} />
        </Slider>
      </div>
    </section>
  )
}

const ItemDonation = ({ title, icon }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <span className="[&>svg]:size-20">{icon}</span>
      <p className="text-lg">{title}</p>
    </div>
  )
}

export default DonationIconAndTitle
