import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import db from '@/lib/db'
import AddXPost from './AddXPost'
import ShowEmbade from './ShowEmbade'
import DeleteXPost from './DeleteXPost'
const countAllXPost = async () => await db?.twEmbade.count()
const AllTwPost = async () => await db?.twEmbade.findMany({
  orderBy: {
    createdAt: 'desc',
  },
})


const CAddPost = async () => {
  const count = await countAllXPost()
  const twPost = await AllTwPost()
  return (
    <AdminPageLayout>
      <div className="flex justify-between">
        <p> Total X Post : {count}</p>
        <AddXPost />
      </div>
      <div>
        <div className="flex flex-wrap">
          {twPost &&
            twPost.map((post) => (
              <div key={post.id} className="w-full  md:w-1/3 xl:w-1/4">
                <div className="p-3">
                  <ShowEmbade embedCode={post.embedCode} />
                  <div className="flex justify-between items-center my-1">
                    <div>
                      <p className="text-sm">
                        Date : {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <DeleteXPost postId={post.id} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default CAddPost
