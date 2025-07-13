'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createAnnulReport(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) {
      return { error: 'Title and URL are required' }
    }

    await db.annulReport.create({
      data: {
        title,
        url,
      },
    })

    revalidatePath('/admin/annul-report')
    return { success: true }
  } catch (error) {
    console.error('Error creating annual report:', error)
    return { error: 'Failed to create annual report' }
  }
}

export async function updateAnnulReport(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) {
      return { error: 'Title and URL are required' }
    }

    await db.annulReport.update({
      where: { id },
      data: {
        title,
        url,
      },
    })

    revalidatePath('/admin/annul-report')
    return { success: true }
  } catch (error) {
    console.error('Error updating annual report:', error)
    return { error: 'Failed to update annual report' }
  }
}

export async function deleteAnnulReport(id: number) {
  try {
    await db.annulReport.delete({
      where: { id },
    })

    revalidatePath('/admin/annul-report')
    return { success: true }
  } catch (error) {
    console.error('Error deleting annual report:', error)
    return { error: 'Failed to delete annual report' }
  }
}