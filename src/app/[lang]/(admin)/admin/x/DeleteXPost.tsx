
'use client'

import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/Credenza'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteXPostProps {
  postId: number
}

const DeleteXPost = ({ postId }: DeleteXPostProps) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/addpost/x?id=${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()
      if (response.ok) {
        refresh()
        setShow(false)
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Credenza onOpenChange={setShow} open={show}>
      <CredenzaTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </CredenzaTrigger>
      {show && (
        <CredenzaContent className="max-w-[400px]">
          <CredenzaHeader>
            <CredenzaTitle>Delete Post</CredenzaTitle>
            <CredenzaDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaFooter>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>

            <CredenzaClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      )}
    </Credenza>
  )
}

export default DeleteXPost