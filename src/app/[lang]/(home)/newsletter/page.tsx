import Image from 'next/image'
import { Subscribe } from './client'

const NewsletterPage = () => {
  return (
    <div className="h-[90vh] relative w-full flex justify-center items-center">
      <Image
        height={1080}
        className="h-full w-full object-cover brightness-75 absolute top-0 bottom-0 left-0 right-0"
        width={1920}
        alt="bg"
        src="https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=geranimo-qzgN45hseN0-unsplash.jpg&w=2400"
      />
      <div className="z-10 relative w-[95%] md:w-[650px] backdrop-blur-md text-white bg-black bg-opacity-30 rounded-md shadow-lg md:ml-[200px]  xl:ml-[600px] 2xl:ml-[800px]">
        <div
          className="m-3md
        m-5"
        >
          <h1 className="text-2xl md:text-4xl font-semibold pt-3">
            Get Our Emails
          </h1>
          <p className="text-sm md:text-base font-light mt-3">
            Enter your email to get exciting news, fun facts & positive
            environmental stories!
          </p>
          <Subscribe />
          <p className="text-sm font-light mt-3">
            *By completing this form you are signing up to receive our emails
            and can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsletterPage
