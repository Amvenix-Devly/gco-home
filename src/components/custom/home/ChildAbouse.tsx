import Image from 'next/image'
import ShinyButton from '@/components/ui/aimate/shiny-button'
import { Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ChildAbouse = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-black ">
      <div className="container flex items-center justify-between h-full gap-10">
        <Image
          alt="abouse child"
          className="object-cover hidden md:block md:w-1/2 h-[90%] rounded-sm"
          height={500}
          width={500}
          src="/child.jpg"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-white font-bold w-[80%] text-center mt-5 md:text-start sm:text-xl lg::text-2xl">
            One Tree for One Child
          </h1>
          <p className="text-white text-sm text-center w-[80%] my-4 md:text-start lg:text-base">
            The One Tree for One Child initiative is a vital program under the
            Global Community Organization (GCO), focusing on environmental
            sustainability and social inclusion. It brings together
            afforestation efforts with community development by providing trees
            to families with newborn children. This initiative aims to create a
            lasting impact on the environment while also addressing the needs of
            vulnerable populations.
          </p>
          <Button variant="outline">
            <div className="flex gap-2">
              <p className="text-white">donation</p>
              <Coins className="size-5 text-main2" />
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}
export default ChildAbouse
