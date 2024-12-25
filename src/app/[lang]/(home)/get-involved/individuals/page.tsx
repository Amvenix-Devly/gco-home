/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'

const IndividualsPage = () => {
  return (
    <div className=" bg-dark text-white md:py-16 py-10 relative">
      <Image
        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Tree Ambassadors stamp"
        fill
        className="object-cover h-full w-full brightness-[40%]"
        priority
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className='flex justify-center gap-10 sm:gap-4 md:gap-20 md:my-16 flex-col md:flex-row items-center'>
          <div className="md:w-[500px] w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center md:text-left">
              The Future of{' '}
              <span className="text-yellow-400">Tree Ambassadors</span>
            </h1>
            <div className="space-y-6 md:text-left text-justify">
              <p>
                As Global Community Organization continues to grow as an organization, we
                want to empower our Tree Ambassadors to continue impacting their
                communities in the most effective way possible. To make this a
                reality, we are improving the program to further its global
                impact.
              </p>
              <p>
                If you're interested in becoming a future Tree Ambassador, fill
                out the form with your contact information to ensure you're
                among the first to know when{' '}
                <strong>we are active again</strong>.
              </p>
            </div>
          </div>
          <div className="md:w-[400px] w-full rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">
              STAY IN THE KNOW
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded bg-white text-black"
                  placeholder="Type your first name"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded bg-white text-black"
                  placeholder="Enter your email"
                />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">
                  Keep me up to date on exciting news, fun facts and positive
                  environmental stories!
                </span>
              </label>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualsPage
