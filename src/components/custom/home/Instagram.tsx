/* eslint-disable @next/next/no-img-element */
'use client'

import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tabs } from '@radix-ui/react-tabs'
import { useIntersectionObserver } from 'usehooks-ts'

import dynamic from 'next/dynamic'
const XTab = dynamic(() => import('./TwTab'), {
  ssr: false,
  loading: () => null,
})
const FbTab = dynamic(() => import('./FbTab'), {
  ssr: false,
  loading: () => null,
})

const Instagram = ({ fb, x }: any) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  })
  return (
    <section ref={ref} id="social">
      <div className="container px-3 py-5">
        <div className="mt-5">
          <h1 className="!text-2xl font-semibold md:!text-3xl !py-5 text-center">
            We are in Social Media
          </h1>
        </div>
        <div>
          <Tabs defaultValue="fb">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="fb">Facebook</TabsTrigger>
                <TabsTrigger value="ins">X(Twitter)</TabsTrigger>
              </TabsList>
            </div>
            <div className="w-full">
              <TabsContent value="fb">
                {isIntersecting && <FbTab fb={fb} />}
              </TabsContent>
              <TabsContent value="ins">
                {isIntersecting && <XTab x={x} />}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Instagram
