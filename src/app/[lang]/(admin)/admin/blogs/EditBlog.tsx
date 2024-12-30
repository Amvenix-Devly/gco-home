/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import '@uiw/react-markdown-preview/markdown.css'
import '@uiw/react-md-editor/markdown-editor.css'
import { Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
type Cat = {
  id: number
  name: string
}[]

type Blog = {
  id: number
  title: string
  content: string
  coverImage: {
    fileUrl: string
  }
  published: boolean
  category: {
    id: number
    name: string
  }
  createdAt: Date
  views: number
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const EditBlog = ({ cat, blogId }: { cat: Cat; blogId: string | number }) => {
  const inputImaeg = useRef<HTMLInputElement | null>(null)
  const [coverImage, setCoverImage] = useState<File | string | null>(null)
  const [value, setValue] = useState('Your blog post here....')
  const [title, setTitle] = useState('')
  const [fetchLoading, setFetchLoading] = useState(true)
  const [published, setPublished] = useState(false)
  const [category, setCategory] = useState('')
  const [views, setViews] = useState(0)
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { refresh } = useRouter()

  useEffect(() => {
    if (show) {
      const data = async () => {
        setFetchLoading(true)
        const blog = await fetch(`/api/blog/?blogId=${blogId}`)
        const { data } = (await blog.json()) as { data: Blog }

        setTitle(data.title)
        setPublished(data.published)
        setCategory(data.category.id + '')
        setValue(data.content)
        setCoverImage(data.coverImage.fileUrl)
        setViews(data.views)
        setFetchLoading(false)
      }
      data()
    }
  }, [blogId, show])

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {}
    if (!title) newErrors.title = 'Title is required'
    if (!category) newErrors.category = 'Category is required'
    if (!value) newErrors.value = 'Content is required'
    if (!coverImage) newErrors.coverImage = 'Cover image is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = async () => {
    if (!validateFields()) return
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('published', published.toString())
    formData.append('value', value)
    formData.append('views', views.toString())
    formData.append('coverImage', coverImage instanceof File ? coverImage : '')
    try {
      await fetch(`/api/blog/?blogId=${blogId}`, {
        method: 'PUT',
        body: formData,
      })

      closeRef.current?.click()
      refresh()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Credenza open={show} onOpenChange={setShow}>
      <CredenzaTrigger asChild>
        <Button>Edit</Button>
      </CredenzaTrigger>
      {show && (
        <CredenzaContent className="md:max-w-[90vw]">
          <CredenzaHeader>
            <CredenzaTitle>Edit blog. Id = {blogId}</CredenzaTitle>
            <CredenzaDescription> </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody
            className={cn(
              fetchLoading &&
                'animate-pulse cursor-progress pointer-events-none'
            )}
          >
            <input
              ref={inputImaeg}
              multiple={false}
              accept="image/*"
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0]
                  if (file) {
                    setCoverImage(file)
                  }
                }
              }}
              className="hidden"
            />
            <div
              onClick={() => {
                if (inputImaeg.current) {
                  !coverImage && inputImaeg.current.click()
                }
              }}
              className={cn(
                'h-[200px] border  border-zinc-500 flex items-center justify-center overflow-hidden rounded-md',
                !coverImage && 'cursor-pointer'
              )}
            >
              {coverImage ? (
                <div className="relative h-full w-full">
                  <Button
                    variant="destructive"
                    onClick={() => setCoverImage(null)}
                    className="z-10 absolute top-3 right-3"
                  >
                    <Trash2 />
                  </Button>
                  <img
                    src={
                      coverImage instanceof File
                        ? URL.createObjectURL(coverImage)
                        : coverImage
                    }
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <p>Click to add cover image</p>
              )}
            </div>
            {errors.coverImage && (
              <p className="text-red-500 text-sm">{errors.coverImage}</p>
            )}

            <div className="mt-3 space-y-1">
              <Label>Title</Label>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <Label>Category</Label>
                <Link
                  href="/admin/categories"
                  className="font-normal text-sm hover:text-blue-500"
                >
                  Manage Category
                </Link>
              </div>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val)}
              >
                <SelectTrigger aria-label="Category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {cat.map((c) => (
                    <SelectItem key={c.id} value={c.id + ''}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <Label>Blog Body</Label>
                <a
                  className="text-sm hover:text-blue-600"
                  target="_blank"
                  href="https://www.markdownguide.org/cheat-sheet/"
                >
                  Learn More MDX
                </a>
              </div>
              <MDEditor value={value} onChange={(val) => setValue(val || '')} />
              {errors.value && (
                <p className="text-red-500 text-sm">{errors.value}</p>
              )}
            </div>

            <div className="mt-3 space-y-1">
              <Label>Views</Label>
              <Input
                type="number"
                min="0"
                value={views}
                onChange={(e) => setViews(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="mt-3 space-y-1">
              <input
                id="rememberMe"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="mr-2"
              />
              <Label>Published</Label>
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button ref={closeRef} variant="secondary">
                Close
              </Button>
            </CredenzaClose>
            <Button disabled={loading} onClick={handleUpdate}>
              Update
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      )}
    </Credenza>
  )
}

export default EditBlog
