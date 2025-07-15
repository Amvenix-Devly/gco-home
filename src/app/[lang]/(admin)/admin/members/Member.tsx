'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { createMember, updateMember, deleteMember } from './action'

interface MemberType {
  id: number
  title: string
  position: number
}

interface AddMemberProps {
  memberTypes: MemberType[]
}

export const MemberAdd = ({ memberTypes }: AddMemberProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTypeId, setSelectedTypeId] = useState('')
  const [isPrevious, setIsPrevious] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      // Add the selected type ID to the form data
      formData.set('typeId', selectedTypeId)
      formData.set('previous', isPrevious.toString())
      
      const result = await createMember(formData)
      if (result.success) {
        setOpen(false)
        // Reset form
        setSelectedTypeId('')
        setIsPrevious(false)
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
        <Button>Add Member</Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-2xl">
        <CredenzaHeader>
          <CredenzaTitle>Add Team Member</CredenzaTitle>
          <CredenzaDescription>
            Add a new team member to your organization.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter job title"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberType">Member Type</Label>
                <Select value={selectedTypeId} onValueChange={setSelectedTypeId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member type" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className=""
              />
              <p className="text-sm text-gray-500">Upload a profile image (optional)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook Profile</Label>
              <Input
                id="facebook"
                name="facebook"
                placeholder="Enter Facebook profile URL"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="previous" 
                checked={isPrevious}
                onCheckedChange={setIsPrevious as any}
              />
              <Label htmlFor="previous">Previous member</Label>
            </div>

            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button type="submit" disabled={loading || !selectedTypeId}>
                {loading ? 'Adding...' : 'Add Member'}
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

interface Member {
  id: number
  name: string
  title: string
  typeId: number | null
  position: number
  imageId: string | null
  imageUrl: string | null
  phone: string | null
  email: string | null
  facebook: string | null
  previous: boolean
}

interface EditMemberProps {
  member: Member
  memberTypes: MemberType[]
}

export const EditMember = ({ member, memberTypes }: EditMemberProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTypeId, setSelectedTypeId] = useState(member.typeId?.toString() || '')
  const [isPrevious, setIsPrevious] = useState(member.previous)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      // Add the selected type ID to the form data
      formData.set('typeId', selectedTypeId)
      formData.set('previous', isPrevious.toString())
      
      const result = await updateMember(member.id, formData)
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
      <CredenzaContent className="max-w-2xl">
        <CredenzaHeader>
          <CredenzaTitle>Edit Team Member</CredenzaTitle>
          <CredenzaDescription>
            Update the team member information.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={member.name}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={member.title}
                  placeholder="Enter job title"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberType">Member Type</Label>
                <Select value={selectedTypeId} onValueChange={setSelectedTypeId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member type" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Display Position</Label>
                <Input
                  id="position"
                  name="position"
                  type="number"
                  defaultValue={member.position}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              {member.imageUrl && (
                <div className="mb-2">
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current image</p>
                </div>
              )}
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className=""
              />
              <p className="text-sm text-gray-500">Upload a new image to replace current one (optional)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={member.phone || ''}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={member.email || ''}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook Profile</Label>
              <Input
                id="facebook"
                name="facebook"
                defaultValue={member.facebook || ''}
                placeholder="Enter Facebook profile URL"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="previous" 
                checked={isPrevious}
                onCheckedChange={setIsPrevious as any}
              />
              <Label htmlFor="previous">Previous member</Label>
            </div>

            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button type="submit" disabled={loading || !selectedTypeId}>
                {loading ? 'Updating...' : 'Update Member'}
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

interface DeleteMemberProps {
  member: {
    id: number
    name: string
    title: string
  }
}

export const DeleteMember = ({ member }: DeleteMemberProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteMember(member.id)
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
          <CredenzaTitle>Delete Team Member</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this team member? This action cannot be undone.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              <strong>Member to delete:</strong> {member.name} - {member.title}
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
            {loading ? 'Deleting...' : 'Delete Member'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
