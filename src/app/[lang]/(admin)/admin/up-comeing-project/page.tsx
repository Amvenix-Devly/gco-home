import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getUser, isAdmin } from '@/lib/auth'
import db from '@/lib/db'
import { headers } from 'next/headers'
import { AddProgram, DeleteProgram, EditProgram, FilterPrograms } from './client'

const ManageUpcomingPrograms = async (x: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await x.searchParams
  const programs = await allPrograms(q)

  return (
    <AdminPageLayout>
      <div className="flex justify-between mt-5">
        <p>Total Programs: {programs.length}</p>
        <div className="flex gap-2 items-center">
          <FilterPrograms />
          <AddProgram addNewProgram={addNew} />
        </div>
      </div>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Beneficiaries</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.id}</TableCell>
                <TableCell>{program.title}</TableCell>
                <TableCell>
                  {program.date
                    ? new Date(program.date).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{program.duration || 'N/A'}</TableCell>
                <TableCell>{program.place || 'N/A'}</TableCell>
                <TableCell>{program.beneficiaries || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteProgram
                      id={program.id}
                      deleteFunction={async () => {
                        'use server'
                        await deleteProgram(program.id)
                      }}
                    />
                    <EditProgram program={program} editFunction={editProgram} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminPageLayout>
  )
}

export default ManageUpcomingPrograms

const allPrograms = async (q: string) => {
  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { place: { contains: q } },
      { beneficiaries: { contains: q } },
    ]
  }

  return await db?.upComingProgram.findMany({
    where,
    orderBy: { date: 'desc' },
  })
}

const addNew = async (data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    await db?.upComingProgram.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : null,
        duration: data.duration,
        place: data.place,
        beneficiaries: data.beneficiaries,
      },
    })
    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const deleteProgram = async (id: number) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    await db?.upComingProgram.delete({
      where: { id: Number(id) },
    })

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const editProgram = async (id: number, data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    await db?.upComingProgram.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : null,
        duration: data.duration,
        place: data.place,
        beneficiaries: data.beneficiaries,
      },
    })

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}
