import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistance } from "date-fns"

type Subscriber = {
  id: number
  name: string
  email: string
  custom: boolean | null
  createdAt: Date
}

export const SubscribersTable = ({ subscribers }: { subscribers: Subscriber[] }) => {
  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.custom ? 'Manual' : 'Website'}</TableCell>
              <TableCell>
                {formatDistance(new Date(subscriber.createdAt), new Date(), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
