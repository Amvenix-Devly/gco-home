'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const DeleteBlog = ({ blogId }: { blogId: string | number }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/?blogId=${blogId}&action=delete`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setOpen(false)
        refresh()
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the blog post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBlog
