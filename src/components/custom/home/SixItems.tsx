/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const SixItems = () => {
  return (
    <div className="container">
      <div className="flex justify-center items-center my-10 gap-5">
        <Item />
        <Item />
      </div>
    </div>
  )
}

const Item = () => {
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
      className="aspect-square h-[300px]  rounded-sm group flex justify-center items-center flex-col relative  overflow-hidden"
    >
      <motion.h1
        variants={AnimatH1}
        initial={{ y: 50 }}
        className="font-bold text-2xl z-10 text-white"
      >
        Title
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
          <p className="text-center text-white line-clamp-2">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <Button className="rounded-none">Read More</Button>
        </motion.div>
      </div>
      <img
        className="size-full object-cover absolute inset-0 top-0 left-0 right-0 bottom-0 z-0 group-hover:brightness-50 transition-all"
        src="https://images.pexels.com/photos/9710820/pexels-photo-9710820.jpeg?auto=compress&cs=tinysrgb&w=750"
        alt="img"
      />
    </motion.div>
  )
}

export default SixItems
