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
import { AddEvent, DeleteEvent, EditEvent, FilterEvents } from './client'
import UploadFile from '@/lib/ImageKit'
import { FileType } from '../../../../../../dbOut'
import Image from 'next/image'
import { imageKit } from '@/lib/ImageKit'

const ManageEvents = async (x: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await x.searchParams
  const events = await allEvents(q)

  return (
    <AdminPageLayout>
      <div className="flex justify-between mt-5">
        <p>Total Events: {events.length}</p>
        <div className="flex gap-2 items-center">
          <FilterEvents />
          <AddEvent addNewEvent={addNew} />
        </div>
      </div>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Beneficiaries</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>
                  <div className="relative w-16 h-12">
                    {event.photo ? (
                      <Image
                        src={event.photo.fileUrl}
                        alt={event.title}
                        className="rounded object-cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{event.duration || 'N/A'}</TableCell>
                <TableCell>{event.place || 'N/A'}</TableCell>
                <TableCell>{event.beneficiaries || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteEvent
                      id={event.id}
                      deleteFunction={async () => {
                        'use server'
                        await deleteEvent(event.id)
                      }}
                    />
                    <EditEvent event={event} editFunction={editEvent} />
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

export default ManageEvents

const allEvents = async (q: string) => {
  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { place: { contains: q } },
      { beneficiaries: { contains: q } },
    ]
  }

  return await db?.event.findMany({
    where,
    orderBy: { date: 'desc' },
    include: { photo: true },
  })
}

const addNew = async (data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    let fileInfo = null

    // Handle image upload if present
    if (data.image) {
      try {
        const uploadResult = await UploadFile(data.image, 'events')
        // Create file record
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.EVENT_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }

    // Create event with conditional file linking
    await db?.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : null,
        duration: data.duration,
        place: data.place,
        beneficiaries: data.beneficiaries,
        ...(fileInfo && { photoId: fileInfo.id }),
      },
    })
    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const deleteEvent = async (id: number) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    // First get the event with its photo information
    const event = await db?.event.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    if (event?.photo?.fileId) {
      try {
        // Delete from ImageKit
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(
            event?.photo?.fileId as string,
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
        })
      } catch (error) {
        console.error('Failed to delete file:', error)
      }
    }

    // Delete the event
    await db?.event.delete({
      where: { id: Number(id) },
    })
    if (event?.photo?.fileId) {
      await db?.file.delete({
        where: { id: event?.photo?.id },
      })
    }

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const editEvent = async (id: number, data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    const event = await db?.event.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    let fileInfo = null

    // Handle image deletion if requested
    if (data.removeExistingImage && event?.photo) {
      try {
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(event?.photo?.fileId as string, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
        })
      } catch (error) {
        console.error('Failed to delete existing image:', error)
      }
    }

    // Handle new image upload if present
    if (data.image) {
      try {
        const uploadResult = await UploadFile(data.image, 'events')
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.EVENT_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }

    await db?.event.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : null,
        duration: data.duration,
        place: data.place,
        beneficiaries: data.beneficiaries,
        photoId: fileInfo?.id || (data.removeExistingImage ? null : undefined),
      },
    })
    if (data.removeExistingImage && event?.photo) {
      await db?.file.delete({
        where: { id: event.photo.id },
      })
    }
    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}
