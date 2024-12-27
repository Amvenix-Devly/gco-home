import db from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const EventPage = async () => {
  const allEvents = await db.event.findMany({
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
      photo: true,
      place: true,
    },
  })

  const allTreaning = await db.training.findMany({
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
      photo: true,
      place: true,
    },
  })
  return (
    <main className="container mb-20">
      <h1 className="text-center text-4xl my-10">Events</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Beneficiaries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEvents.map((event, index) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event?.description}</TableCell>
              <TableCell>
                <a href={event?.photo?.fileUrl}>Image</a>
              </TableCell>
              <TableCell>{event.date && new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event?.duration}</TableCell>
              <TableCell>{event?.place}</TableCell>
              <TableCell>{event?.beneficiaries}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-center text-4xl mt-20 mb-10">Treaning</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Photo</TableHead>
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
                <a href={event?.photo?.fileUrl}>Image</a>
              </TableCell>
              <TableCell>{event.date && new Date(event.date).toLocaleDateString()}</TableCell>
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

export default EventPage
