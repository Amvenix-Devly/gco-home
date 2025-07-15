'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import UploadFile from '@/lib/ImageKit'

// Member Type Actions
export async function createMemberType(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const position = parseInt(formData.get('position') as string) || 0

    if (!title) {
      return { error: 'Title is required' }
    }

    await db.memberType.create({
      data: {
        title,
        position,
      },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error creating member type:', error)
    return { error: 'Failed to create member type' }
  }
}

export async function updateMemberType(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const position = parseInt(formData.get('position') as string) || 0

    if (!title) {
      return { error: 'Title is required' }
    }

    await db.memberType.update({
      where: { id },
      data: {
        title,
        position,
      },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error updating member type:', error)
    return { error: 'Failed to update member type' }
  }
}

export async function deleteMemberType(id: number) {
  try {
    // Check if there are members with this type
    const memberCount = await db.member.count({
      where: { typeId: id }
    })

    if (memberCount > 0) {
      return { error: `Cannot delete member type. ${memberCount} member(s) are assigned to this type.` }
    }

    await db.memberType.delete({
      where: { id },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error deleting member type:', error)
    return { error: 'Failed to delete member type' }
  }
}

// Member Actions
export async function createMember(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const title = formData.get('title') as string
    const typeId = parseInt(formData.get('typeId') as string)
    const position = parseInt(formData.get('position') as string) || 0
    const imageFile = formData.get('image') as File
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const facebook = formData.get('facebook') as string
    const previous = formData.get('previous') === 'true'

    if (!name || !title || !typeId) {
      return { error: 'Name, title, and member type are required' }
    }

    let imageId = null
    let imageUrl = null

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResult = await UploadFile(imageFile, 'members')
        imageId = uploadResult.fileId
        imageUrl = uploadResult.url
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return { error: 'Failed to upload image' }
      }
    }

    await db.member.create({
      data: {
        name,
        title,
        typeId,
        position,
        imageId,
        imageUrl,
        phone: phone || null,
        email: email || null,
        facebook: facebook || null,
        previous,
      },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error creating member:', error)
    return { error: 'Failed to create member' }
  }
}

export async function updateMember(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const title = formData.get('title') as string
    const typeId = parseInt(formData.get('typeId') as string)
    const position = parseInt(formData.get('position') as string) || 0
    const imageFile = formData.get('image') as File
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const facebook = formData.get('facebook') as string
    const previous = formData.get('previous') === 'true'

    if (!name || !title || !typeId) {
      return { error: 'Name, title, and member type are required' }
    }

    // Get current member data
    const currentMember = await db.member.findUnique({
      where: { id },
      select: { imageId: true, imageUrl: true }
    })

    let imageId = currentMember?.imageId
    let imageUrl = currentMember?.imageUrl

    // Handle image upload if new image is provided
    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResult = await UploadFile(imageFile, 'members')
        imageId = uploadResult.fileId
        imageUrl = uploadResult.url
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return { error: 'Failed to upload image' }
      }
    }

    await db.member.update({
      where: { id },
      data: {
        name,
        title,
        typeId,
        position,
        imageId,
        imageUrl,
        phone: phone || null,
        email: email || null,
        facebook: facebook || null,
        previous,
      },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error updating member:', error)
    return { error: 'Failed to update member' }
  }
}

export async function deleteMember(id: number) {
  try {
    await db.member.delete({
      where: { id },
    })

    revalidatePath('/admin/members')
    return { success: true }
  } catch (error) {
    console.error('Error deleting member:', error)
    return { error: 'Failed to delete member' }
  }
}