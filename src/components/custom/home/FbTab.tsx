'use client'
import { Button } from '@/components/ui/button'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { FacebookEmbed } from 'react-social-media-embed'

const FbTab = ({ fb }: any) => {
  return (
    <div className="mt-5">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1100: 4 }}
      >
        <Masonry gutter="20px">
          {fb.map((post: any) => (
            <div className="w-full h-auto" key={post.id}>
              <FacebookEmbed width="auto" url={post?.embedCode} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div className="flex justify-center pb-2 mt-5">
        <Button
          asChild
          className=" px-6 border border-white text-black bg-white px rounded-[2px] py-2 hover:scale-105 z-20 uppercase font-medium"
        >
          <a
            target="_blank"
            href="https://www.facebook.com/GlobalCommunityOrganization"
          >
            Show More
          </a>
        </Button>
      </div>
    </div>
  )
}

export default FbTab
