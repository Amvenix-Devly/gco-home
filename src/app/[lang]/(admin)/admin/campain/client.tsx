'use client'
// ...existing code...

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
import Image from 'next/image'
import compressImage from '@/lib/imageCompress'
import { usePathname, useSearchParams } from 'next/navigation'

// ...existing code...

const campainSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  place: z.string().optional(),
  beneficiaries: z.string().optional(),
  image: z.any().optional(),
})

export const AddCampain = ({
  addNewCampain,
}: {
  addNewCampain: (data: any) => void
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    place: '',
    beneficiaries: '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const compressedImage = await compressImage(file)
        setData((prev) => ({ ...prev, image: compressedImage }))
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(compressedImage)
      } catch {
        setData((prev) => ({ ...prev, image: file }))
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleRemoveImage = () => {
    setData((prev) => ({ ...prev, image: null }))
    setImagePreview(null)
  }

  const handleSubmit = () => {
    try {
      setError('')
      const validated = campainSchema.parse(data)
      startTransition(async () => {
        const result: any = await addNewCampain(validated)
        if (!result?.isOk) {
          setError(result.error)
          return
        }
        refresh()
        setOpen(false)
      })
    } catch (err: any) {
      setError(err?.errors[0].message)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Add New Campain</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Add New Campain</CredenzaTitle>
          <CredenzaDescription>Create a new campain</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter campain title"
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
              placeholder="Enter campain description"
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
              placeholder="e.g. 2 hours, 3 days"
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
              placeholder="Enter campain location"
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
              placeholder="Enter campain beneficiaries"
              value={data.beneficiaries}
              onChange={(e) =>
                setData((prev) => ({ ...prev, beneficiaries: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="image">Campain Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2 space-y-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="w-full"
                >
                  Remove Image
                </Button>
                <div className="relative w-full aspect-video">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            Save Campain
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export const DeleteCampain = ({
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
          <CredenzaTitle>Delete Campaign</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this campaign?
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

export const FilterCampains = () => {
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
        <Button>Filter Campaigns</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Filter Campaigns</CredenzaTitle>
          <CredenzaDescription>
            Search campaigns by title, place, or beneficiaries
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search campaigns..."
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

type CampainData = {
  id: number
  title: string
  description: string | null
  date: Date | null
  duration: string | null
  place: string | null
  beneficiaries: string | null
  photo?: {
    id: number
    fileUrl: string
    fileId: string
  } | null
}

export const EditCampain = ({
  campain,
  editFunction,
}: {
  campain: CampainData
  editFunction: (id: number, data: any) => Promise<{ isOk: boolean; error?: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: campain.title,
    description: campain.description || '',
    date: campain.date ? new Date(campain.date).toISOString().split('T')[0] : '',
    duration: campain.duration || '',
    place: campain.place || '',
    beneficiaries: campain.beneficiaries || '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(campain.photo?.fileUrl || null)
  const [removeExistingImage, setRemoveExistingImage] = useState(false)
  const [error, setError] = useState('')
  const [loading, startTran] = useTransition()
  const { refresh } = useRouter()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const compressedImage = await compressImage(file)
        setData((prev) => ({ ...prev, image: compressedImage }))
        setRemoveExistingImage(true)
        
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(compressedImage)
      } catch (error) {
        setData((prev) => ({ ...prev, image: file }))
        
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleRemoveImage = () => {
    setData((prev) => ({ ...prev, image: null }))
    setImagePreview(null)
    setRemoveExistingImage(true)
  }

  const handleEdit = async () => {
    try {
      setError('')
      const validated = campainSchema.parse(data)

      startTran(async () => {
        const result = await editFunction(campain.id, {
          ...validated,
          removeExistingImage,
        })
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
          <CredenzaTitle>Edit Campaign</CredenzaTitle>
          <CredenzaDescription>Update campaign information</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter campaign title"
              value={data.title}
              onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter campaign description"
              value={data.description}
              onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => setData((prev) => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g. 2 hours, 3 days"
              value={data.duration}
              onChange={(e) => setData((prev) => ({ ...prev, duration: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Enter campaign location"
              value={data.place}
              onChange={(e) => setData((prev) => ({ ...prev, place: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
            <Input
              id="beneficiaries"
              placeholder="Enter campaign beneficiaries"
              value={data.beneficiaries}
              onChange={(e) => setData((prev) => ({ ...prev, beneficiaries: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="image">Campaign Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2 space-y-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="w-full"
                >
                  Remove Image
                </Button>
                <div className="relative w-full aspect-video">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
              </div>
            )}
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

// ...existing code...
