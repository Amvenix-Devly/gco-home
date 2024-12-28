'use client'

import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/Credenza'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { z } from 'zod'
import { useSearchParams, usePathname } from 'next/navigation'

const programSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  place: z.string().optional(),
  beneficiaries: z.string().optional(),
})

export const AddProgram = ({
  addNewProgram,
}: {
  addNewProgram: (data: any) => void
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    place: '',
    beneficiaries: '',
  })
  const [error, setError] = useState('')
  const [loading, startTran] = useTransition()
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    try {
      setError('')
      const validated = programSchema.parse(data)

      startTran(async () => {
        const result: any = await addNewProgram(validated)
        if (!result?.isOk) {
          setError(result.error)
          return
        }
        refresh()
        setOpen(false)
      })
    } catch (error: any) {
      setError(error?.errors[0].message)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Add New Program</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Add New Program</CredenzaTitle>
          <CredenzaDescription>Create a new upcoming program</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter program title"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter program description"
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              placeholder="Select program date"
              value={data.date}
              onChange={(e) =>
                setData((prev) => ({ ...prev, date: e.target.value }))
              }
              className='w-full block'
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 2 hours, 3 days"
              value={data.duration}
              onChange={(e) =>
                setData((prev) => ({ ...prev, duration: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Enter program location"
              value={data.place}
              onChange={(e) =>
                setData((prev) => ({ ...prev, place: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
            <Input
              id="beneficiaries"
              placeholder="Enter program beneficiaries"
              value={data.beneficiaries}
              onChange={(e) =>
                setData((prev) => ({ ...prev, beneficiaries: e.target.value }))
              }
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            Save Program
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export const DeleteProgram = ({
  id,
  deleteFunction,
}: {
  id: number
  deleteFunction: () => void
}) => {
  const [open, setOpen] = useState(false)
  const [loading, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteFunction()
      refresh()
      setOpen(false)
    })
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-[400px]">
        <CredenzaHeader>
          <CredenzaTitle>Delete Program</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this program?
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={loading} onClick={handleDelete}>
            Delete
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

type ProgramData = {
  id: number
  title: string
  description: string | null
  date: Date | null
  duration: string | null
  place: string | null
  beneficiaries: string | null
}

export const EditProgram = ({
  program,
  editFunction,
}: {
  program: ProgramData
  editFunction: (id: number, data: any) => Promise<{ isOk: boolean; error?: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: program.title,
    description: program.description || '',
    date: program.date ? new Date(program.date).toISOString().split('T')[0] : '',
    duration: program.duration || '',
    place: program.place || '',
    beneficiaries: program.beneficiaries || '',
  })
  const [error, setError] = useState('')
  const [loading, startTran] = useTransition()
  const { refresh } = useRouter()

  const handleEdit = async () => {
    try {
      setError('')
      const validated = programSchema.parse(data)

      startTran(async () => {
        const result = await editFunction(program.id, validated)
        if (!result.isOk) {
          setError(result.error || 'Unknown error occurred')
          return
        }
        refresh()
        setOpen(false)
      })
    } catch (error: any) {
      setError(error?.errors[0].message)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="outline">Edit</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Edit Program</CredenzaTitle>
          <CredenzaDescription>Update program information</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter program title"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter program description"
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              placeholder="Select program date"
              value={data.date}
              onChange={(e) =>
                setData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 2 hours, 3 days"
              value={data.duration}
              onChange={(e) =>
                setData((prev) => ({ ...prev, duration: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Enter program location"
              value={data.place}
              onChange={(e) =>
                setData((prev) => ({ ...prev, place: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
            <Input
              id="beneficiaries"
              placeholder="Enter program beneficiaries"
              value={data.beneficiaries}
              onChange={(e) =>
                setData((prev) => ({ ...prev, beneficiaries: e.target.value }))
              }
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleEdit}>
            Save Changes
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export const FilterPrograms = () => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    setOpen(false)
    replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setOpen(false)
    setSearchTerm('')
    replace(pathname)
  }

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchTerm(q)
  }, [searchParams])

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Filter Programs</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Filter Programs</CredenzaTitle>
          <CredenzaDescription>
            Search programs by title, place, or beneficiaries
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button onClick={handleClear} variant="outline">
            Clear Filter
          </Button>
          <Button onClick={handleSearch}>Apply Filter</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

// Export other components (FilterPrograms) here...
