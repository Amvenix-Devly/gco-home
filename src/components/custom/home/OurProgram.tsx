/* eslint-disable @next/next/no-img-element */
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Leaf, Home, BookOpen, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const programs = [
  {
    title: 'One Tree For One Child',
    description:
      'Environmental initiative promoting sustainability through youth engagement',
    icon: Leaf,
    color: 'text-green-500',
    gradient: 'from-green-50 to-yellow-50',
  },
  {
    title: 'Abalamban',
    description: 'Housing and community development program',
    icon: Home,
    color: 'text-slate-700',
    gradient: 'from-slate-50 to-gray-50',
  },
  {
    title: 'TYAGI Research Center',
    description: 'Advanced research and development facility',
    icon: BookOpen,
    color: 'text-red-500',
    gradient: 'from-red-50 to-rose-50',
  },
  {
    title: 'TYAGI Enterprise',
    description: 'Business and entrepreneurship development',
    icon: Building2,
    color: 'text-red-500',
    gradient: 'from-red-50 to-rose-50',
  },
]

const Items = [
  {
    id: 1,
    description:
      'Protect the Planet, Act Now for Future Generations!',
    title: 'Climate action',
    img: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    img: 'https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg',
    description:
      'Grow Sustainably, Nourish Communities, Secure Our Future!',
    title: 'Health',
  },
  {
    id: 3,
    img: 'https://img.freepik.com/free-photo/top-view-vegetables-arrangement-with-plate_23-2148667880.jpg',
    description:
      'Prioritize Health, Empower Lives, Build Stronger Communities!',
    title: 'Food Security',
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg',
    description:
      'Equal Rights, Every Voice, Justice for All Humanity!',
    title: 'Human Rights',
  },
]

export default function OurProgram() {
  return (
    <section className="w-full py-12 md:py-20">
      {/* bg-gradient-to-b from-white to-gray-50 dark:text-black dark:from-gray-700 dark:to-zinc-900 */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white capitalize">
            What we do
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover our initiatives designed to create positive impact and
            sustainable change in our communities.
          </p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {programs.map((program) => (
            <Card
              key={program.title}
              className={`group relative overflow-hidden transition-all hover:shadow-lg bg-gradient-to-br ${program.gradient}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform ${program.color}`}
                  >
                    <program.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold tracking-tight text-xl dark:text-black">{program.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{program.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="flex mt-10">
          {Items.map((item) => (
            <div className="w-[25%] aspect-square" key={item.id}>
              <div className='m-2 h-full'>
              <Item content={item.description} img={item.img} title={item.title} />
              </div>
            </div>
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
      className="size-full  rounded-sm group flex justify-center items-center flex-col relative  overflow-hidden"
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
