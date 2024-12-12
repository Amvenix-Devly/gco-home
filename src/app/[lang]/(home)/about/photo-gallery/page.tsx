import db from '@/lib/db'
import SwitChLayout from './Client'

const PhotoGallaryPage = async () => {
  const allCat = await db?.blogCategory.findMany({
    select: {
      id: true,
      name: true,
      BlogPost: {
        select: {
          coverImage: {
            select: {
              fileUrl: true,
            },
          },
        },
      },
    },
  })
  return (
    <>
      <div className="bg-green-500">
        <h1 className="text-center text-4xl p-3">Image</h1>
      </div>
      <section className="container">
        <SwitChLayout allCat={allCat} />
      </section>
    </>
  )
}

export default PhotoGallaryPage
