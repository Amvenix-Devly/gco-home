import Image from "next/image"

const WhyTreePlants = () => {
  return (
    <section className="border-b border-b-black mb-5">
      <div className="container py-20 flex flex-col items-center gap-5 md:gap-10">
        <h2 className="md:text-2xl text-xl font-bold">WHY PLANT TREES?</h2>
        <div className="flex px-3 gap-10  flex-col xl:flex-row items-center justify-center">
          <ItemWhyPlan
            title="Carbon Sequestration"
            description="Trees absorb carbon dioxide and other pollutants, which helps to clean the air and reduce the effects of climate change."
            image="https://images.pexels.com/photos/2931996/pexels-photo-2931996.jpeg"
          />
          <ItemWhyPlan
            title="Carbon Sequestration"
            description="Trees absorb carbon dioxide and other pollutants, which helps to clean the air and reduce the effects of climate change."
            image="https://images.pexels.com/photos/458976/pexels-photo-458976.jpeg"
          />
          <ItemWhyPlan
            title="Carbon Sequestration"
            description="Trees absorb carbon dioxide and other pollutants, which helps to clean the air and reduce the effects of climate change."
            image="https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
      </div>
    </section>
  )
}

const ItemWhyPlan = ({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) => {
  return (
    <div className="w-[90%] sm:w-[350px] md:w-[400px] lg:w-[350px]">
      <div className="w-full aspect-square">
        <Image className="w-full h-full object-cover" src={image} alt={title} width={400} height={400} />
      </div>
      <div className="space-y-3 mt-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="line-clamp-5">{description}</p>
      </div>
    </div>
  )
}

export default WhyTreePlants
