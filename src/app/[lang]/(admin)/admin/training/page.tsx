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
import { AddTraining, DeleteTraining, EditTraining, FilterTrainings } from './client'
import UploadFile from '@/lib/ImageKit'
import { FileType } from '@prisma/client' 
import Image from 'next/image'
import { imageKit } from '@/lib/ImageKit'

const ManageTrainings = async (x: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await x.searchParams
  const trainings = await allTrainings(q)

  return (
    <AdminPageLayout>
      <div className="flex justify-between mt-5">
        <p>Total Trainings: {trainings.length}</p>
        <div className="flex gap-2 items-center">
          <FilterTrainings />
          <AddTraining addNewTraining={addNew} />
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
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell>{training.id}</TableCell>
                <TableCell>
                  <div className="relative w-16 h-12">
                    {training.photo ? (
                      <Image
                        src={training.photo.fileUrl}
                        alt={training.title}
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
                <TableCell>{training.title}</TableCell>
                <TableCell>
                  {training.date
                    ? new Date(training.date).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{training.duration || 'N/A'}</TableCell>
                <TableCell>{training.place || 'N/A'}</TableCell>
                <TableCell>{training.beneficiaries || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteTraining
                      id={training.id}
                      deleteFunction={async () => {
                        'use server'
                        await deleteTraining(training.id)
                      }}
                    />
                    <EditTraining training={training} editFunction={editTraining} />
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

export default ManageTrainings

const allTrainings = async (q: string) => {
  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { place: { contains: q } },
      { beneficiaries: { contains: q } },
    ]
  }

  return await db?.training.findMany({
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

    if (data.image) {
      try {
        const uploadResult = await UploadFile(data.image, 'trainings')
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.TRAINING_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }

    await db?.training.create({
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

const deleteTraining = async (id: number) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    const training = await db?.training.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    if (training?.photo?.fileId) {
      try {
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(training?.photo?.fileId as string, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
        })
      } catch (error) {
        console.error('Failed to delete file:', error)
      }
    }

    await db?.training.delete({
      where: { id: Number(id) },
    })
    if (training?.photo?.fileId) {
      await db?.file.delete({
        where: { id: training?.photo?.id },
      })
    }

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const editTraining = async (id: number, data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    const training = await db?.training.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    let fileInfo = null

    if (data.removeExistingImage && training?.photo) {
      try {
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(training?.photo?.fileId as string, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
        })
      } catch (error) {
        console.error('Failed to delete existing image:', error)
      }
    }

    if (data.image) {
      try {
        const uploadResult = await UploadFile(data.image, 'trainings')
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.TRAINING_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }

    await db?.training.update({
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

    if (data.removeExistingImage && training?.photo) {
      await db?.file.delete({
        where: { id: training.photo.id },
      })
    }

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}
