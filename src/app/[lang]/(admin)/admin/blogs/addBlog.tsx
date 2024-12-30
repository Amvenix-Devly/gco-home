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
import { Plus, Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
type Cat = {
  id: number
  name: string
}[]

const AddBlog = ({ cat }: { cat: Cat }) => {

  const inputImaeg = useRef<HTMLInputElement | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [value, setValue] = useState('Your blog post here....')
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(false)
  const [category, setCategory] = useState('')
  const [views, setViews] = useState(0)
  const [errors, setErrors] = useState({
    title: '',
    body: '',
    image: '',
    category: '',
  })
  const [globalError, setGlobalError] = useState('')
  const { refresh } = useRouter()
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    const newErrors = { title: '', body: '', image: '', category: '' }
    let isValid = true

    if (!title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }
    if (!value.trim() || value === 'Your blog post here....') {
      newErrors.body = 'Content is required'
      isValid = false
    }
    if (!coverImage) {
      newErrors.image = 'Cover image is required'
      isValid = false
    } else if (coverImage.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size must be less than 2 MB'
      isValid = false
    }
    if (!category) {
      newErrors.category = 'Category is required'
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', value)
    formData.append('views', views.toString())
    if (coverImage) {
      formData.append('coverImage', coverImage)
    }
    formData.append('category', category)
    formData.append('published', published.toString())

    setLoading(true)
    try {
      await fetch('/api/blog', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      setTitle('')
      setValue('Your blog post here....')
      setCoverImage(null)
      setCategory('')
      setPublished(false)

      closeRef?.current?.click()

      refresh()
      setLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      setGlobalError('Error submitting form')
      setLoading(false)
    }
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>
          <span className="hidden md:block">Add A Blog</span>
          <Plus className="size-5" />
        </Button>
      </CredenzaTrigger>
    
        <CredenzaContent className="md:max-w-[90vw]">
          <CredenzaHeader>
            <CredenzaTitle>Add blog</CredenzaTitle>
            <CredenzaDescription> </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            {globalError && <p className="text-red-500">{globalError}</p>}
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
                    src={URL.createObjectURL(coverImage)}
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <p>Click to add cover image</p>
              )}
            </div>
            {errors.image && <p className="text-red-500">{errors.image}</p>}

            <div className="mt-3 space-y-1">
              <Label>Title</Label>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
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
                <p className="text-red-500">{errors.category}</p>
              )}{' '}
              {/* Display category error */}
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
              {errors.body && <p className="text-red-500">{errors.body}</p>}
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
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Add Blog'}
            </Button>
            <CredenzaClose asChild>
              <Button ref={closeRef} variant="secondary">
                Close
              </Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
    
    </Credenza>
  )
}

export default AddBlog
