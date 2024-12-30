import db from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const UpCommingPage = async () => {
  const allTreaning = await db.upComingProgram.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      title: true,
      description: true,
      date: true,
      beneficiaries: true,
      duration: true,
      id: true,

      place: true,
    },
  })
  return (
    <main className="container mb-20">
      <h1 className="text-center text-4xl mt-20 mb-10">Up coming program</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>

            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Beneficiaries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTreaning.map((event, index) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event?.description}</TableCell>

              <TableCell>
                {event.date && new Date(event.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{event?.duration}</TableCell>
              <TableCell>{event?.place}</TableCell>
              <TableCell>{event?.beneficiaries}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default UpCommingPage
