import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import { Button } from '@/components/ui/button'
import db from '@/lib/db'
import AddFbPost from './AddFbPost'
import ShowEmbade from './ShowEmbade'
import DeleteFbPost from './DeleteFbPost'

const countAllFbPost = async () => await db?.fbEmbade.count()
const getAllFbPost = async () =>
  await db?.fbEmbade.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

const FbPostPage = async () => {
  const count = await countAllFbPost()
  const fbPost = await getAllFbPost()

  return (
    <AdminPageLayout>
      <div className="flex justify-between">
        <p> Total Facebook Post : {count}</p>
        <AddFbPost />
      </div>
      <div>
        <div className="flex flex-wrap">
          {fbPost &&
            fbPost.map((post) => (
              <div key={post.id} className="w-full  md:w-1/3 xl:w-1/4">
                <div className="p-3">
                  <ShowEmbade embedCode={post.embedCode} />
                  <div className="flex justify-between items-center my-1">
                    <div>
                      <p className="text-sm">
                        Date : {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <DeleteFbPost postId={post.id} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default FbPostPage
