'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createAuditReport(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) {
      return { error: 'Title and URL are required' }
    }

    await db.auditReport.create({
      data: {
        title,
        url,
      },
    })

    revalidatePath('/admin/audit-report')
    return { success: true }
  } catch (error) {
    console.error('Error creating audit report:', error)
    return { error: 'Failed to create audit report' }
  }
}

export async function updateAuditReport(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) {
      return { error: 'Title and URL are required' }
    }

    await db.auditReport.update({
      where: { id },
      data: {
        title,
        url,
      },
    })

    revalidatePath('/admin/audit-report')
    return { success: true }
  } catch (error) {
    console.error('Error updating audit report:', error)
    return { error: 'Failed to update audit report' }
  }
}

export async function deleteAuditReport(id: number) {
  try {
    await db.auditReport.delete({
      where: { id },
    })

    revalidatePath('/admin/audit-report')
    return { success: true }
  } catch (error) {
    console.error('Error deleting audit report:', error)
    return { error: 'Failed to delete audit report' }
  }
}
