import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import db from '@/lib/db'
import { ProjectType } from '@prisma/client' 

const CompleteProjectPage = async () => {
  const allCompletedProject = await db.project.findMany({
    where: {
      projectType: ProjectType.COMPLATE_PROJECT,
    },
    orderBy: {
      startTime: 'asc',
    },
  })
  return (
    <main className="container mb-20">
      <h1 className="text-center text-4xl my-10">Completed Projects</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Sl. No.</TableHead>
            <TableHead>Project Title</TableHead>
            <TableHead>Funded by</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Projec Duration</TableHead>
            <TableHead>Partnership with</TableHead>
            <TableHead>Project Area</TableHead>
            <TableHead className="text-right">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompletedProject.map((project, index) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.fundedby}</TableCell>
              <TableCell>
                {new Date(project.startTime).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {project.endTime === 'Continue'
                  ? project.endTime
                  : new Date(project.endTime).toLocaleDateString()}
              </TableCell>
              <TableCell>{project.projectDuration}</TableCell>
              <TableCell>{project.pertnershipWith}</TableCell>
              <TableCell>{project.projectArea}</TableCell>
              <TableCell>{project.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default CompleteProjectPage
