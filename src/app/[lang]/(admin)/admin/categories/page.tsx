import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import db from '@/lib/db'
import AddCategory from './AddCategory'
import UpdatCat from './Updatecategory'



const BlogCategorysPage = async () => {
  const allCategory = await allCetrgory()

  return (
    <AdminPageLayout title="Category">
      <div className="flex justify-between mt-5">
        <p>Total Category : {allCategory.length}</p>
        <AddCategory />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Posts Count</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCategory.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category._count.BlogPost}</TableCell>
              <TableCell>
               <UpdatCat id={category.id} value = {category.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminPageLayout>
  )
}

const allCetrgory = async () =>
  await db?.blogCategory.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          BlogPost: true,
        },
      },
    },
  })

export default BlogCategorysPage
