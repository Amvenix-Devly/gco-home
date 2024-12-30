'use client'
import { Facebook, Instagram, Linkedin, Mail, X, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { subscribeToNewsletter } from '@/app/[lang]/(home)/newsletter/action'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import Logo from './Logo'

/* eslint-disable @next/next/no-img-element */
const Footer = () => {
  return (
    <section className="bg-bgMain text-white">
      <MobileFooter />
      <DesktopFooter />
      <BootomBar />
    </section>
  )
}

const AuthorizedImages = ['/img/footer/auth1.webp', '/img/footer/auth2.webp']
const VettedBYImages = ['/img/footer/vett.png', '/img/footer/vett2.png']
const PlantingPartnerImages = [
  '/img/footer/plan1.webp',
  '/img/footer/plan2.jpg',
]

const NewsletterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = () => {
    setError(null)
    setSuccess(false)
    
    startTransition(async () => {
      const result = await subscribeToNewsletter(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setFormData({ name: '', email: '' })
      }
    })
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <input
        className="w-full rounded-[5px] py-2 px-2"
        type="text"
        placeholder="Enter your first name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        disabled={isPending}
      />
      <input
        className="w-full rounded-[5px] py-2 px-2"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        disabled={isPending}
      />
      <button 
        className="w-full rounded-[5px] py-2 bg-main2 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? 'Signing up...' : 'Sign up'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Successfully subscribed!</p>}
    </div>
  )
}

const MobileFooter = () => {
  return (
    <footer className="md:hidden container px-3">
      <div>
        <div className="flex justify-center pt-5">
          <Logo className="!w-[350px]" />
        </div>
        <div>
          <div className="flex flex-col justify-center w-full items-center gap-4">
            <div>
              <h1 className="uppercase text-lg">Authorized BY</h1>
            </div>
            <div className="flex gap-3">
              {AuthorizedImages.map((img, i) => (
                <img
                  key={i}
                  className="w-[80px] rounded-md aspect-square object-cover"
                  src={img}
                  alt="gvt"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full items-center gap-4 mt-5">
            <div>
              <h1 className="uppercase text-lg">Vetted BY</h1>
            </div>
            <div className="flex gap-3">
              {VettedBYImages.map((img, i) => (
                <img
                  key={i}
                  className="w-[80px] rounded-md aspect-square object-cover"
                  src={img}
                  alt="vetted"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full items-center gap-4 mt-5">
            <div>
              <h1 className="uppercase text-lg">Planting Partner</h1>
            </div>
            <div className="flex gap-3">
              {PlantingPartnerImages.map((img, i) => (
                <img
                  key={i}
                  className="w-[80px] rounded-md aspect-square object-cover"
                  src={img}
                  alt="planting"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center ">
          <Accordion type="single" collapsible className="w-[80%]">
            <AccordionItem className="border-b border-slate-600" value="item-1">
              <AccordionTrigger className="text-lg !no-underline">
                About Us
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link href="#">Mission and Vision</Link>
                  <Link href="#">History of GCO</Link>
                  <Link href="#">Meet The Team</Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-b border-slate-600" value="item-2">
              <AccordionTrigger className="text-lg !no-underline">
                Contract US
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p>
                    Global Community Organization South Milik Bagha Bagha-6280,
                    Bagha, Rajshahi, Bangladesh
                  </p>
                  <p>hello@globalcommunityorganization.org</p>
                  <p>Mobile: +8801760870070</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-b border-slate-600" value="item-3">
              <AccordionTrigger className="text-lg !no-underline">
                TAX ID #463673947101
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p>
                    GCO is a tax-exempt organization & your donation is
                    tax-deductible within the guidelines of B.D law.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-b border-slate-600" value="item-4">
              <AccordionTrigger className="text-lg !no-underline">
                FINANCIALS
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link href="#">2023 Audit Report</Link>
                  <Link href="#">2022 Audit Report</Link>
                  <Link href="#">2021 Audit Report</Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-b border-slate-600" value="item-5">
              <AccordionTrigger className="text-lg !no-underline">
                Social Link
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center justify-center topsocial gap-4 [&>*]:text-white [&>a>svg]:size-5 ml-2 ">
                  <a href="#">
                    <Mail />
                  </a>
                  <a href="#">
                    <Facebook />
                  </a>
                  <a href="#">
                    <Instagram />
                  </a>

                  <a href="#">
                    <Youtube />
                  </a>
                  <a href="#">
                    <Linkedin />
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-10 w-[80%] mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </footer>
  )
}

const DesktopFooter = () => {
  return (
    <footer className="hidden md:block">
      <div className="container">
        <div className="flex justify-between gap-3">
          <div className="w-[calc(20%-10px)]">
            <div>
              <Logo />
            </div>

            <div className="flex flex-col  w-full gap-4">
              <div>
                <h1 className="uppercase text-base font-semibold">
                  Authorized BY
                </h1>
              </div>
              <div className="flex gap-3">
                {AuthorizedImages.map((img, i) => (
                  <img
                    key={i}
                    className="w-[80px] rounded-md aspect-square object-cover"
                    src={img}
                    alt="gvt"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full  gap-4 mt-5">
              <div>
                <h1 className="uppercase text-base font-semibold">Vetted BY</h1>
              </div>
              <div className="flex gap-3">
                {VettedBYImages.map((img, i) => (
                  <img
                    key={i}
                    className="w-[80px] rounded-md aspect-square object-cover"
                    src={img}
                    alt="vetted"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[calc(20%-10px)]">
            <div className="flex flex-col w-full gap-4 mt-5">
              <div>
                <h1 className="uppercase text-base font-semibold">
                  Planting Partner
                </h1>
              </div>
              <div className="flex gap-3">
                {PlantingPartnerImages.map((img, i) => (
                  <img
                    key={i}
                    className="w-[80px] rounded-md aspect-square object-cover"
                    src={img}
                    alt="planting"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <h1 className="text-lg font-semibold uppercase">About Us</h1>
              <Link className="mt-3" href="#">
                Mission and Vision
              </Link>
              <Link href="#">History of GCO</Link>
              <Link href="#">Meet The Team</Link>
            </div>
          </div>
          <div className="w-[calc(20%-10px)]">
            <div>
              <h1 className="mt-5 mb-3 text-lg font-semibold uppercase">
                Contract US
              </h1>
              <p>
                Global Community Organization South Milik Bagha Bagha-6280,
                Bagha, Rajshahi, Bangladesh
              </p>
              <p className="break-words">
                hello@globalcommunityorganization.org
              </p>
              <p>Mobile: +8801760870070</p>
            </div>
            <div className="flex items-center  topsocial gap-3 [&>*]:text-white [&>a>svg]:size-4  mt-5 ">
              <a href="#">
                <Mail />
              </a>
              <a
                href="https://www.facebook.com/GlobalCommunityOrganization"
                target="_new"
              >
                <Facebook />
              </a>
              <a href="https://x.com/Global_Com_Org" target="_new">
                <X />
              </a>

              <a
                href="https://www.youtube.com/@globalcommunityorganization"
                target="_new"
              >
                <Youtube />
              </a>
              <a
                href="https://www.linkedin.com/in/global-community-organization-4428951a6/"
                target="_new"
              >
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="w-[calc(20%-10px)]">
            <div>
              <h1 className="mt-5 mb-3 text-lg font-semibold">
                TAX ID #463673947101
              </h1>
              <p>
                GCO is a tax-exempt organization & your donation is
                tax-deductible within the guidelines of B.D law.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="mt-5 mb-3 text-lg font-semibold">FINANCIALS</h1>
              <Link href="#">2023 Audit Report</Link>
              <Link href="#">2022 Audit Report</Link>
              <Link href="#">2021 Audit Report</Link>
            </div>
          </div>
          <div className="w-[calc(20%-10px)]">
            <h1 className="text-lg font-semibold mt-5">NEWSLETTER SIGNUP</h1>
            <div className="my-3">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const BootomBar = () => {
  return (
    <div className="container flex justify-around items-center  flex-col-reverse lg:flex-row py-5 gap-3 lg:gap-0">
      <p>©2023 GCO all rights are reserved.</p>
      <img className="object-cover h-10" src="/payment.png" alt="payment" />
    </div>
  )
}

export default Footer
