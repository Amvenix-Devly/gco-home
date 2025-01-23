'use client'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const FacebookEmbed = dynamic(
  () => import('react-social-media-embed').then((mod) => mod.FacebookEmbed),
  {
    ssr: false,
    loading: () => null,
  }
)

const FbTab = ({ fb }: any) => {
  return (
    <div className="mt-5">
      <div className='flex gap-4 flex-wrap justify-center'>
        {fb.map((post: any) => (
          <div className="w-[20%] h-auto" key={post.id}>
            <FacebookEmbed width="100%" url={post?.embedCode} />
          </div>
        ))}
      </div>
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
