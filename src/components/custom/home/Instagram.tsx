/* eslint-disable @next/next/no-img-element */

import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tabs } from '@radix-ui/react-tabs'
import FbTab from './FbTab'
import XTab from './TwTab'

const Instagram = ({ fb, x }: any) => {
  return (
    <section id='social'>
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
                <FbTab fb={fb} />
              </TabsContent>
              <TabsContent value="ins">
                <XTab x={x} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Instagram
