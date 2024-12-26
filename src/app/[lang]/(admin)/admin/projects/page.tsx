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
import {
  AddProject,
  DeleteProject,
  EditProject,
  FilterProjects,
} from './client'

const ManageProjectPage = async (x: {
  searchParams: Promise<{ type: string; q: string }>
}) => {
  const { type, q } = await x.searchParams

  const projects = await allProject(type, q)
  return (
    <AdminPageLayout>
      <div className="flex justify-between mt-5">
        <p> Total Projects: {projects.length}</p>
        <div className="flex gap-2 items-center">
          <FilterProjects />
          <AddProject addNewProject={addNew} />
        </div>
      </div>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Funded By</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Project Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.fundedby}</TableCell>
                <TableCell>{project.projectDuration}</TableCell>
                <TableCell>
                  {project.projectType === 'ON_GOING_PROJECT'
                    ? 'On Going'
                    : 'Complete'}
                </TableCell>
                <TableCell>
                  {new Date(project.startTime).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {project.endTime === 'Continue'
                    ? project.endTime
                    : new Date(project.endTime).toLocaleDateString()}
                </TableCell>
                <TableCell>{project.projectArea}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteProject
                      id={project.id}
                      deleteFunction={async () => {
                        'use server'
                        await deleteProject(project?.id)
                      }}
                    />
                    <EditProject
                      project={project as any}
                      editFunction={editProject}
                    />
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

export default ManageProjectPage

type new_project = {
  title: string
  fundedby: string
  startTime: string
  endTime: string
  projectDuration: string
  pertnershipWith: string
  projectArea: string
  note: string
  projectType: string
}

const addNew = async (data: new_project) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }
    const x = await db?.project.create({
      data: {
        title: data.title,
        startTime: new Date(data.startTime),
        endTime: data.endTime,
        fundedby: data.fundedby,
        projectDuration: data.projectDuration,
        pertnershipWith: data.pertnershipWith,
        projectArea: data.projectArea,
        note: data.note,
        projectType: data.projectType as any,
      },
    })
    console.log(x)
    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const allProject = async (type: string, q: string) => {
  return await db?.project.findMany({
    where: {
      OR: [
        { projectType: type as any },
        {
          title: {
            contains: q,
          },
        },
        {
          fundedby: {
            contains: q,
          },
        },
        {
          projectArea: {
            contains: q,
          },
        },
      ],
    },
    orderBy: {
      startTime: 'asc',
    },
  })
}

const deleteProject = async (id: Number) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    await db?.project.delete({
      where: { id: Number(id) },
    })

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const editProject = async (id: number, data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    await db?.project.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        startTime: new Date(data.startTime),
        endTime: data.endTime,
        fundedby: data.fundedby,
        projectDuration: data.projectDuration,
        pertnershipWith: data.pertnershipWith,
        projectArea: data.projectArea,
        note: data.note,
        projectType: data.projectType,
      },
    })

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}
