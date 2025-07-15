'use client'

import React, { useState } from 'react'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/Credenza'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createMemberType, updateMemberType, deleteMemberType } from './action'

// Add Member Type Component
export const AddMemberType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const result = await createMemberType(formData)
      if (result.success) {
        setOpen(false)
      } else if (result.error) {
        alert(result.error)
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Add Member Type</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add Member Type</CredenzaTitle>
          <CredenzaDescription>
            Add a new member type to organize your team members.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter member type title (e.g., Board Members, Staff)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Display Position</Label>
              <Input
                id="position"
                name="position"
                type="number"
                placeholder="0"
                defaultValue="0"
              />
              <p className="text-sm text-gray-500">Lower numbers appear first</p>
            </div>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Member Type'}
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

// Edit Member Type Component
interface EditMemberTypeProps {
  memberType: {
    id: number
    title: string
    position: number
  }
}

export const EditMemberType = ({ memberType }: EditMemberTypeProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const result = await updateMemberType(memberType.id, formData)
      if (result.success) {
        setOpen(false)
      } else if (result.error) {
        alert(result.error)
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Edit Member Type</CredenzaTitle>
          <CredenzaDescription>
            Update the member type information.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={memberType.title}
                placeholder="Enter member type title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Display Position</Label>
              <Input
                id="position"
                name="position"
                type="number"
                defaultValue={memberType.position}
                placeholder="0"
              />
              <p className="text-sm text-gray-500">Lower numbers appear first</p>
            </div>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Member Type'}
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

// Delete Member Type Component
interface DeleteMemberTypeProps {
  memberType: {
    id: number
    title: string
  }
}

export const DeleteMemberType = ({ memberType }: DeleteMemberTypeProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteMemberType(memberType.id)
      if (result.success) {
        setOpen(false)
      } else if (result.error) {
        alert(result.error)
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete Member Type</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this member type? This action cannot be undone.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              <strong>Member Type to delete:</strong> {memberType.title}
            </p>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </CredenzaClose>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Member Type'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
