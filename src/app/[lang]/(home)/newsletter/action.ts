'use server'

import db from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
})

export async function subscribeToNewsletter(formData: { email: string, name: string }) {
  try {
    const validated = schema.parse(formData)
    
    await db.subscriber.create({
      data: {
        email: validated.email,
        name: validated.name
      }
    })
    
    return { success: true }
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid input data' }
    }
    
    if (error?.code === 'P2002') {
      return { error: 'This email is already subscribed' }
    }
    
    return { error: 'Something went wrong' }
  }
}
