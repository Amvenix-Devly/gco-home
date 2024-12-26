'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  fundedby: z.string().min(2, 'Funded by must be at least 2 characters'),
  startTime: z.string().min(1, 'Start date is required'),
  endTime: z.string().min(1, 'End date is required').optional(),
  projectDuration: z.string().min(1, 'Duration is required'),
  pertnershipWith: z.string().optional(),
  projectArea: z.string().min(2, 'Project area must be at least 2 characters'),
  note: z.string().min(1, 'Note must be at least 10 characters'),
  projectType: z.enum(['COMPLATE_PROJECT', 'ON_GOING_PROJECT'], {
    required_error: 'Please select a project type',
    message: 'Select a project type',
  }),
})

export const AddProject = ({
  addNewProject,
}: {
  addNewProject: (data: any) => void
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: '',
    fundedby: '',
    startTime: '',
    endTime: '',
    projectDuration: '',
    pertnershipWith: '',
    projectArea: '',
    note: '',
    projectType: '',
  })

  const [continueCh, setContineCh] = useState(false)
  const [error, setError] = useState('')
  const [loading, startTran] = useTransition()
  const changeData = (key: string, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }
  const { refresh } = useRouter()

  const reset = () => {
    setData({
      title: '',
      fundedby: '',
      startTime: '',
      endTime: '',
      projectDuration: '',
      pertnershipWith: '',
      projectArea: '',
      note: '',
      projectType: '',
    })
    setContineCh(false)
    setError('')
  }

  const _hendelAddProject = async () => {
    try {
      setError('')
      const validated = projectSchema.parse(data)

      startTran(async () => {
        const x: any = await addNewProject(validated)
        if (!x?.isOk) {
          setError(x.error)
          return
        }
        refresh()
        reset()
        setOpen(false)
      })
    } catch (error: any) {
      setError(error?.errors[0].message)
      console.log(error)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Add New Project</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Add New Project</CredenzaTitle>
          <CredenzaDescription> </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Project title"
              onChange={(e) => changeData('title', e.target.value)}
              value={data.title}
            />
          </div>
          <div>
            <Label htmlFor="fundedby">Funded By</Label>
            <Input
              onChange={(e) => changeData('fundedby', e.target.value)}
              value={data.fundedby}
              id="fundedby"
              placeholder="Funded by organization"
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              className="w-full block"
              id="startDate"
              placeholder="e.g., 2021-01-01"
              type="date"
              onChange={(e) => changeData('startTime', e.target.value)}
              value={data.startTime}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>End Date</Label>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="con"
                  checked={continueCh}
                  onCheckedChange={(v: boolean) => {
                    setContineCh(v)
                    changeData('endTime', v ? 'Continue' : '')
                  }}
                />
                <label
                  htmlFor="con"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Continue
                </label>
              </div>
            </div>
            <Input
              className="w-full block"
              id="startDate"
              placeholder="e.g., 2021-01-01"
              type={continueCh ? 'text' : 'date'}
              disabled={continueCh}
              onChange={(e) => changeData('endTime', e.target.value)}
              value={data.endTime}
            />
          </div>

          <div>
            <Label htmlFor="duration">Project Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 6 months"
              onChange={(e) => changeData('projectDuration', e.target.value)}
              value={data.projectDuration}
            />
          </div>
          <div>
            <Label htmlFor="partnership">Partnership With</Label>
            <Input
              id="partnership"
              placeholder="Partner organizations"
              onChange={(e) => changeData('pertnershipWith', e.target.value)}
              value={data.pertnershipWith}
            />
          </div>
          <div>
            <Label htmlFor="area">Project Area</Label>
            <Input
              id="area"
              placeholder="Project location/area"
              onChange={(e) => changeData('projectArea', e.target.value)}
              value={data.projectArea}
            />
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Additional notes about the project"
              onChange={(e) => changeData('note', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={data.projectType}
              onValueChange={(e) => changeData('projectType', e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLATE_PROJECT">
                  Complete Project
                </SelectItem>
                <SelectItem value="ON_GOING_PROJECT">
                  Ongoing Project
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={_hendelAddProject}>
            Save Project
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export const DeleteProject = ({
  id,
  deleteFunction,
}: {
  id: Number
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
          <CredenzaTitle>Delete Project</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

type ProjectData = {
  id: number
  title: string
  fundedby: string
  startTime: Date
  endTime: string
  projectDuration: string
  pertnershipWith: string | undefined
  projectArea: string
  note: string
  projectType: 'COMPLATE_PROJECT' | 'ON_GOING_PROJECT'
}

export const EditProject = ({
  project,
  editFunction,
}: {
  project: ProjectData
  editFunction: (
    id: number,
    data: any
  ) => Promise<{ isOk: boolean; error?: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: project.title,
    fundedby: project.fundedby,
    startTime: new Date(project.startTime).toISOString().split('T')[0],
    endTime: project.endTime,
    projectDuration: project.projectDuration,
    pertnershipWith: project.pertnershipWith || '',
    projectArea: project.projectArea,
    note: project.note,
    projectType: project.projectType,
  })

  const [continueCh, setContineCh] = useState(project.endTime === 'Continue')
  const [error, setError] = useState('')
  const [loading, startTran] = useTransition()
  const { refresh } = useRouter()

  const changeData = (key: string, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const handleEdit = async () => {
    try {
      setError('')
      const validated = projectSchema.parse(data)

      startTran(async () => {
        const result = await editFunction(project.id, validated)
        if (!result.isOk) {
          setError(result.error || 'Unknown error occurred')
          return
        }
        refresh()
        setOpen(false)
      })
    } catch (error: any) {
      setError(error?.errors[0].message)
      console.log(error)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="outline">Edit</Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[500px] w-full">
        <CredenzaHeader>
          <CredenzaTitle>Edit Project</CredenzaTitle>
          <CredenzaDescription>Update project information</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Project title"
              onChange={(e) => changeData('title', e.target.value)}
              value={data.title}
            />
          </div>
          <div>
            <Label htmlFor="fundedby">Funded By</Label>
            <Input
              onChange={(e) => changeData('fundedby', e.target.value)}
              value={data.fundedby}
              id="fundedby"
              placeholder="Funded by organization"
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              className="w-full block"
              type="date"
              onChange={(e) => changeData('startTime', e.target.value)}
              value={data.startTime}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>End Date</Label>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="con"
                  checked={continueCh}
                  onCheckedChange={(v: boolean) => {
                    setContineCh(v)
                    changeData('endTime', v ? 'Continue' : '')
                  }}
                />
                <label htmlFor="con">Continue</label>
              </div>
            </div>
            <Input
              className="w-full block"
              type={continueCh ? 'text' : 'date'}
              disabled={continueCh}
              onChange={(e) => changeData('endTime', e.target.value)}
              value={data.endTime}
            />
          </div>

          <div>
            <Label htmlFor="duration">Project Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 6 months"
              onChange={(e) => changeData('projectDuration', e.target.value)}
              value={data.projectDuration}
            />
          </div>
          <div>
            <Label htmlFor="partnership">Partnership With</Label>
            <Input
              id="partnership"
              placeholder="Partner organizations"
              onChange={(e) => changeData('pertnershipWith', e.target.value)}
              value={data.pertnershipWith}
            />
          </div>
          <div>
            <Label htmlFor="area">Project Area</Label>
            <Input
              id="area"
              placeholder="Project location/area"
              onChange={(e) => changeData('projectArea', e.target.value)}
              value={data.projectArea}
            />
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Additional notes about the project"
              onChange={(e) => changeData('note', e.target.value)}
              value={data.note}
            />
          </div>
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={data.projectType}
              onValueChange={(e) => changeData('projectType', e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLATE_PROJECT">
                  Complete Project
                </SelectItem>
                <SelectItem value="ON_GOING_PROJECT">
                  Ongoing Project
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
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

export const FilterProjects = ({}) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: '',
    projectType: '',
  })
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const _hendelSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (data.title !== '') {
      params.set('q', data.title)
    } else {
      params.delete('q')
    }
    if (data.projectType !== '') {
      params.set('type', data.projectType)
    } else {
      params.delete('type')
    }
    setOpen(false)
    replace(`${pathname}?${params.toString()}`)
  }
  const _hendelClear = () => {
    setOpen(false)
    setData({ title: '', projectType: '' })
    replace(pathname)
  }

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || ''
    setData({ title: q, projectType: type })
  }, [searchParams])

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Filter Projects</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Filter Projects</CredenzaTitle>
          <CredenzaDescription>
            Filter projects by different criteria
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4">
          <div>
            <Label htmlFor="title">Search</Label>
            <Input
              id="title"
              placeholder="Project Search by title, area, foundedby."
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              value={data.title}
            />
          </div>
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={data.projectType}
              onValueChange={(e) =>
                setData((prev) => ({ ...prev, projectType: e }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLATE_PROJECT">
                  Complete Project
                </SelectItem>
                <SelectItem value="ON_GOING_PROJECT">
                  Ongoing Project
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button onClick={_hendelClear} variant="outline">
            Clear Filter
          </Button>
          <Button onClick={_hendelSearch}>Apply Filter</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
