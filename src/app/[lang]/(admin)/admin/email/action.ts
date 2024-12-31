'use server'
import db from "@/lib/db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

import { sendEmail } from "@/lib/sendEmail"

export const allSubscriberCount = async () => await db.subscriber.count()
export const allSubscriber = async () => await db.subscriber.findMany()

export const addCustomSubscriber = async (data: { name: string; email: string }) => {
  try {
    await db.subscriber.create({
      data: {
        name: data.name,
        email: data.email,
        custom: true
      }
    })
    return { success: true }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { 
          success: false, 
          error: 'This email is already subscribed' 
        }
      }
    }
    console.error(error)
    return { 
      success: false, 
      error: 'Failed to add subscriber' 
    }
  }
}

export const sendEmails = async (data:any) => {
  let listOfEmails = []
  if (data.emails === 'all') {
     listOfEmails = await db.subscriber.findMany({
      select: { email: true }
    })
  }else{
    listOfEmails = data.emails
  }
  for (const sub of listOfEmails) {
    await sendEmail({
      to: sub.email,
      subject: data.subject,
      text: data.message
    })
  }
  
}