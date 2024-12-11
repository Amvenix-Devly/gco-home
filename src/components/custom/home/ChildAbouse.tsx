import Image from 'next/image'
import ShinyButton from '@/components/ui/aimate/shiny-button'
import { Coins } from 'lucide-react'

const ChildAbouse = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-black ">
      <Image
        alt="abouse child"
        className="object-cover -z-10 absolute top-0 left-0 bottom-0 right-0 size-full md:w-1/2"
        height={500}
        width={500}
        src="/abousechild.jpg"
        
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 md:hidden z-[-5] size-full " />

      <div className="grbg absolute top-0 left-0 bottom-0 right-0 size-full z-[-5] opacity-0 md:opacity-100" />
      <div className="container flex flex-col items-center justify-center md:flex-row">
        <div className="hidden md:block md:w-1/2" />
        <div className="md:w-1/2 flex  flex-col items-center md:items-start md:gap-4 sm:gap-3 h-full mt-5 sm:mt-10 md:mt-12">
          <h1 className="text-white font-bold w-[80%] text-center mt-5 md:text-start sm:text-xl lg::text-2xl">
            One Tree, One Child
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
          <ShinyButton>
            <div className="flex gap-2">
              <p className="text-white">donation</p>
              <Coins className="size-5 text-main2" />
            </div>
          </ShinyButton>
        </div>
      </div>
    </section>
  )
}
export default ChildAbouse
