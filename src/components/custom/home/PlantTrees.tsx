/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const works = [
  {
    title: 'One Tree for One Child',
    content: 'Plant a Tree, Nurture a Child, Grow Futures!',
    image: '/child.jpg',
    path :'/what-we-do#Food%20Security'
  },
  {
    title: 'TreeLanching',
    content: 'Grow Green, Empower Lives, Sustain Earth!',
    image: '/img/treelanching.jpg',
  },
  {
    title: 'One Tree for One Student',
    content: 'One Student, One Tree, Greener Tomorrow Starts Today!',
    image: '/img/student/img1.jpg',
    path :'/what-we-do#Food%20Security'
  },
]

const GetInTouchItesm = [
  {
    title: 'Individuals',
    content:
      'Become a Tree Ambassador and support our global reforestation efforts',
    image:
      'https://images.pexels.com/photos/9724710/pexels-photo-9724710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    path: '/get-involved/individuals',
  },
  {
    title: 'Businesses',
    content: 'Enhance your Corporate Social Responsibility',
    image:
      'https://images.pexels.com/photos/7728639/pexels-photo-7728639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    path: '/get-involved/business',
  },
  {
    title: 'School',
    content: 'Bring Environmental Education to classrooms and campuses',
    image:
      'https://images.stockcake.com/public/7/3/0/730cee1b-2140-4f66-a185-cf5fa8f8cbe4_large/children-planting-tree-stockcake.jpg',
    path: '/get-involved/schools',
  },
]

export const PlantTrees = () => {
  return (
    <div className="my-10 container pb-0">
      <h1 className="text-center !text-2xl font-semibold md:!text-3xl">
        Tremendous innovations and initiatives
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-10 px-3">
        {works.map((work, index) => (
          <Item
            key={index}
            content={work.content}
            img={work.image}
            title={work.title}
          />
        ))}
      </div>

      <h1 className="text-center !text-2xl font-semibold md:!text-3xl mt-20">
        Get In Touch
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-10 px-3">
        {GetInTouchItesm.map((work, index) => (
          <Item
            key={index}
            content={work.content}
            img={work.image}
            title={work.title}
            path={work.path}
          />
        ))}
      </div>
    </div>
  )
}

const Item = ({
  content,
  img,
  title,
  path,
}: {
  title: string
  content: string
  img: string
  path?: string
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
  const { push } = useRouter()
  return (
    <motion.div
      onClick={() => path && push(path)}
      whileHover={'hover'}
      whileFocus={'hover'}
      whileDrag={'hover'}
      className="aspect-square h-[340px]  rounded-sm group flex justify-center items-center flex-col relative  overflow-hidden cursor-pointer"
    >
      <motion.h1
        variants={AnimatH1}
        initial={{ y: 50 }}
        className="font-bold text-2xl z-10 text-white uppercase text-center"
      >
        {title}
      </motion.h1>
      <div className="flex justify-center flex-col items-center space-y-1 mt-3 z-20">
        <motion.hr
          variants={AnimatHr}
          initial={{
            scale: 0,
          }}
          className="h-[2px] bg-white w-[200px] border-none"
        />
        <motion.div
          variants={Animat}
          initial={{ opacity: 0, scale: 0.999, y: 20 }}
          className="space-y-1 flex justify-center flex-col items-center"
        >
          <p className="text-center text-white line-clamp-2 mx-2">{content}</p>
          <Button className="rounded-none">Read More</Button>
        </motion.div>
      </div>
      <img
        className="size-full object-cover absolute inset-0 top-0 left-0 right-0 bottom-0 z-0 group-hover:brightness-50 transition-all"
        src={img}
        alt="img"
      />
    </motion.div>
  )
}
