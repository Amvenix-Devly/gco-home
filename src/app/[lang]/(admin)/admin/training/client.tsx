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
import compressImage from '@/lib/imageCompress'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

const trainingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  place: z.string().optional(),
  beneficiaries: z.string().optional(),
  image: z.any().optional(),
})

export const AddTraining = ({
  addNewTraining,
}: {
  addNewTraining: (data: any) => void
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
  const [loading, startTran] = useTransition()
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
      } catch (error) {
        console.error('Error compressing image:', error)
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

  const handleSubmit = async () => {
    try {
      setError('')
      const validated = trainingSchema.parse(data)

      startTran(async () => {
        const result: any = await addNewTraining(validated)
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
        <Button>Add New Training</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Add New Training</CredenzaTitle>
          <CredenzaDescription>Create a new training</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter training title"
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
              placeholder="Enter training description"
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
              placeholder="Select training date"
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
              placeholder="Enter training location"
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
              placeholder="Enter training beneficiaries"
              value={data.beneficiaries}
              onChange={(e) =>
                setData((prev) => ({ ...prev, beneficiaries: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="image">Training Image</Label>
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
            Save Training
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

type TrainingData = {
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

export const EditTraining = ({
  training,
  editFunction,
}: {
  training: TrainingData
  editFunction: (id: number, data: any) => Promise<{ isOk: boolean; error?: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: training.title,
    description: training.description || '',
    date: training.date ? new Date(training.date).toISOString().split('T')[0] : '',
    duration: training.duration || '',
    place: training.place || '',
    beneficiaries: training.beneficiaries || '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(training.photo?.fileUrl || null)
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
        console.error('Error compressing image:', error)
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
      const validated = trainingSchema.parse(data)

      startTran(async () => {
        const result = await editFunction(training.id, {
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
          <CredenzaTitle>Edit Training</CredenzaTitle>
          <CredenzaDescription>Update training information</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter training title"
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
              placeholder="Enter training description"
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
              placeholder="Select training date"
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
              placeholder="Enter training location"
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
              placeholder="Enter training beneficiaries"
              value={data.beneficiaries}
              onChange={(e) =>
                setData((prev) => ({ ...prev, beneficiaries: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="image">Training Image</Label>
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

export const DeleteTraining = ({
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
          <CredenzaTitle>Delete Training</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this training?
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

export const FilterTrainings = () => {
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
        <Button>Filter Trainings</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Filter Trainings</CredenzaTitle>
          <CredenzaDescription>
            Search trainings by title, place, or beneficiaries
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search trainings..."
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


