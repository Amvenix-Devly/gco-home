import React from 'react'
import TeamComponent from './_Component'
import db from '@/lib/db'
const getMembers = async () => {
  return await db?.memberType.findMany({
    orderBy: {
      position: 'asc',
    },
    select: {
      id: true,
      title: true,
      Member: {
        select: {
          name: true,
          email: true,
          phone: true,
          imageUrl: true,
          title: true,
          previous: true,
          facebook: true,
          id: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })
}

const page = async () => {
  const members = await getMembers()
  return <TeamComponent members={members} />
}

export default page
