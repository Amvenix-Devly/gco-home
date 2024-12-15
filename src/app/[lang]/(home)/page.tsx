import BlogSection from '@/components/custom/home/BlogSection'
import Carosel from '@/components/custom/home/Carosel'
import ChildAbouse from '@/components/custom/home/ChildAbouse'
import DonarAndCo from '@/components/custom/home/DonarAndCo'
import Instagram from '@/components/custom/home/Instagram'
import MiniWOrdlMap from '@/components/custom/home/MiniWOrdlMap'
import OurProgram from '@/components/custom/home/OurProgram'
import { PlantTrees } from '@/components/custom/home/PlantTrees'
import db from '@/lib/db'

const HomePage = async () => {
  const mostViewedBlog = await mostViewBlog()
  const listBlog = await blogs(mostViewedBlog?.id)
  const listFbPost = await getAllFbPost()
  const listXPost = await getAllXPost()
  return (
    <>
      <div className="md:h-[550px]">
        <Carosel />
      </div>
      {/* <OurJob /> */}
      {/* <SixItems /> */}
      <OurProgram />
      <PlantTrees />
      {/* <ProgramOverview /> */}
      <BlogSection mostViewedBlog={mostViewedBlog} listBlog={listBlog} />
      <MiniWOrdlMap />
      <ChildAbouse />
      {/* <Donate /> */}
      <DonarAndCo />
      <Instagram fb={listFbPost} x={listXPost} />
    </>
  )
}

const mostViewBlog = async () =>
  db.blogPost.findFirst({
    orderBy: {
      views: 'desc',
    },
    select: {
      id: true,
      title: true,
      content: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
    },
  })

const blogs = async (mostId: string | undefined) =>
  db.blogPost.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      ...(mostId && { NOT: { id: mostId } }),
    },
    select: {
      id: true,
      title: true,
      content: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
    },
  })

const getAllFbPost = async () =>
  await db?.fbEmbade.findMany({
    take: 8,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      embedCode: true,
      id: true,
    },
  })

const getAllXPost = async () =>
  await db?.twEmbade.findMany({
    take: 8,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      embedCode: true,
      id: true,
    },
  })

export default HomePage
