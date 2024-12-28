import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import db from '@/lib/db'
import Image from 'next/image'
import { headers } from 'next/headers'
import { getUser, isAdmin } from '@/lib/auth'
import UploadFile from '@/lib/ImageKit'
import { FileType } from '../../../../../../dbOut'
import { AddCampain, DeleteCampain, EditCampain, FilterCampains } from './client'
import { imageKit } from '@/lib/ImageKit'

const CampainPage = async (x: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await x.searchParams
  const campains = await allCampain(q)

  return (
    <AdminPageLayout title="Category">
      <div className="flex justify-between mt-5">
        <p>Total Campains: {campains.length}</p>
        <div className="flex gap-2 items-center">
          <FilterCampains />
          <AddCampain addNewCampain={addNewCampain} />
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
            {campains.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>
                  <div className="relative w-16 h-12">
                    {c.photo ? (
                      <Image
                        src={c.photo.fileUrl}
                        alt={c.title}
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
                <TableCell>{c.title}</TableCell>
                <TableCell>
                  {c.date ? new Date(c.date).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>{c.duration || 'N/A'}</TableCell>
                <TableCell>{c.place || 'N/A'}</TableCell>
                <TableCell>{c.beneficiaries || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteCampain
                      id={c.id}
                      deleteFunction={async () => {
                        'use server'
                        await deleteCampain(c.id)
                      }}
                    />
                    <EditCampain campain={c} editFunction={editCampain} />
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

const allCampain = async (q: string) => {
  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { place: { contains: q } },
      { beneficiaries: { contains: q } },
    ]
  }
  return await db?.campain.findMany({
    where,
    orderBy: { date: 'desc' },
    include: { photo: true },
  })
}

const addNewCampain = async (data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    if (!isAdmin(user)) return { error: 'Unauthorized', isOk: false }

    let fileInfo = null
    if (data.image) {
      try {
        const uploadResult = await UploadFile(data.image, 'campains')
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.CAMPAIN_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }
    await db?.campain.create({
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

const deleteCampain = async (id: number) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    // First get the campaign with its photo information
    const campaign = await db?.campain.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    if (campaign?.photo?.fileId) {
      try {
        // Delete from ImageKit
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(
            campaign?.photo?.fileId as string,
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

    // Delete the campaign
    await db?.campain.delete({
      where: { id: Number(id) },
    })
    
    if (campaign?.photo?.fileId) {
      await db?.file.delete({
        where: { id: campaign?.photo?.id },
      })
    }

    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

const editCampain = async (id: number, data: any) => {
  'use server'
  try {
    const user = await getUser(headers)
    const isadmin = isAdmin(user)
    if (!isadmin) return { error: 'Unauthorized', isOk: false }

    const campain = await db?.campain.findUnique({
      where: { id: Number(id) },
      include: { photo: true },
    })

    let fileInfo = null

    // Handle image deletion if requested
    if (data.removeExistingImage && campain?.photo) {
      try {
        await new Promise((resolve, reject) => {
          imageKit.deleteFile(campain?.photo?.fileId as string, (error, result) => {
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
        const uploadResult = await UploadFile(data.image, 'campains')
        fileInfo = await db?.file.create({
          data: {
            fileId: uploadResult.fileId,
            fileUrl: uploadResult.url,
            type: FileType.CAMPAIN_PHOTO,
          },
        })
      } catch (error) {
        console.error('Image upload failed:', error)
        return { error: 'Image upload failed', isOk: false }
      }
    }

    await db?.campain.update({
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

    if (data.removeExistingImage && campain?.photo) {
      await db?.file.delete({
        where: { id: campain.photo.id },
      })
    }
    
    return { isOk: true }
  } catch (error) {
    console.log(error)
    return { error: 'Server Error', isOk: false }
  }
}

export default CampainPage