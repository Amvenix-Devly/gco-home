/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Items = [
  {
    id: 1,
    description: 'Protect the Planet, Act Now for Future Generations!',
    title: 'Climate action',
    img: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    path: '/what-we-do#climate%20action',
  },
  {
    id: 2,
    img: 'https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg',
    description: 'Grow Sustainably, Nourish Communities, Secure Our Future!',
    title: 'Health',
    path: '/what-we-do#health',
  },
  {
    id: 3,
    img: 'https://img.freepik.com/free-photo/top-view-vegetables-arrangement-with-plate_23-2148667880.jpg',
    description:
      'Prioritize Health, Empower Lives, Build Stronger Communities!',
    title: 'Food Security',
    path: '/what-we-do#Food%20Security',
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg',
    description: 'Equal Rights, Every Voice, Justice for All Humanity!',
    title: 'Human Rights',
    path: '/what-we-do#Human Rights',
  },
]

export default function OurProgram() {
  return (
    <section className='w-full py-12 md:py-20'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white capitalize'>
            What we do
          </h2>
          <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
            Discover our initiatives designed to create positive impact and
            sustainable change in our communities.
          </p>
        </div>

        <div className='flex mt-10 flex-wrap  items-center justify-center'>
          {Items.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className='size-[300px] sm:size-[50%] md:size-[25%]'
            >
              <div className='m-5'>
                <Item
                  content={item.description}
                  img={item.img}
                  title={item.title}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const Item = ({
  content,
  img,
  title,
}: {
  title: string
  content: string
  img: string
}) => {
  const Animat = {
    hover: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3,
        ease: 'easeInOut',
      },
    },
  }
  const AnimatHr = {
    hover: {
      scale: 1,
      transition: {
        ease: 'easeInOut',
      },
    },
  }
  const AnimatH1 = {
    hover: {
      y: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
  }
  return (
    <motion.div
      whileHover={'hover'}
      whileFocus={'hover'}
      whileDrag={'hover'}
      className='size-full aspect-square rounded-sm group flex justify-center items-center flex-col relative  overflow-hidden'
    >
      <motion.h1
        variants={AnimatH1}
        initial={{ y: 50 }}
        className='font-bold text-2xl z-10 text-white uppercase text-center'
      >
        {title}
      </motion.h1>
      <div className='flex justify-center flex-col items-center space-y-1 mt-3 z-20'>
        <motion.hr
          variants={AnimatHr}
          initial={{
            scale: 0,
          }}
          className='h-[2px] bg-white w-[200px] border-none'
        />
        <motion.div
          variants={Animat}
          initial={{ opacity: 0, scale: 0.999, y: 20 }}
          className='space-y-1 flex justify-center flex-col items-center'
        >
          <p className='text-center text-white line-clamp-2 mx-2'>{content}</p>
          <Button className='rounded-none'>Read More</Button>
        </motion.div>
      </div>
      <Image
        width={300}
        height={300}
        className='size-full object-cover absolute inset-0 top-0 left-0 right-0 bottom-0 z-0 group-hover:brightness-50 transition-all'
        src={img}
        alt='img'
      />
    </motion.div>
  )
}
