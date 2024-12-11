/* eslint-disable @next/next/no-img-element */
import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import db from '@/lib/db'
import AddBlog from './addBlog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import EditBlog from './EditBlog'

const AdminBlogPage = async () => {
  const blogCount = await getBlogCount()
  const allcat = await allCategory()
  const allBlogs = await allBlog()

  return (
    <AdminPageLayout title="Blogs">
      <div className="flex justify-between mt-5">
        <p> Total Blogs : {blogCount}</p>
        <AddBlog cat={allcat} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBlogs.map((blog:any) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.id}</TableCell>
              <TableCell>
                <img src={blog.coverImage.fileUrl} alt={blog.title} className="size-10 object-cover" />
              </TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.category.name}</TableCell>
              <TableCell>{blog.published ? "Yes" : "No"}</TableCell>
              <TableCell>{blog.views}</TableCell>
              <TableCell className='space-x-3'>
                <EditBlog blogId={blog.id} cat={allcat} />
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminPageLayout>
  )
}

const getBlogCount = async () => await db?.blogPost.count()
const allCategory = async () =>
  await db?.blogCategory.findMany({
    select: {
      id: true,
      name: true,
    },
  })
const allBlog = async () =>
  await db?.blogPost.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      coverImage: {
        select: {
          fileUrl: true,
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
      createdAt: true,
      views: true,
    },
  })
export default AdminBlogPage
