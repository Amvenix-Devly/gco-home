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
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const UpdatCat = ({ id, value }: any) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [name, setName] = useState(value)
  const [errors, setErrors] = useState({
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    const newErrors = { name: '' }
    let isValid = true

    if (!name.trim()) {
      newErrors.name = 'Category name is required'
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      return
    }

    try {
      setLoading(true)
      await fetch('/api/category', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, id: id }),
      })
    
      refresh()
      closeRef?.current?.click()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setErrors({
        name: 'Something went wrong',
      })
    }
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>Update</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Update Category</CredenzaTitle>
          <CredenzaDescription asChild>
            <p className="text-red-500">
              You can only add or edit category. so be carefull.
            </p>
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {/* ...existing code... */}
          <div className="mt-3 space-y-1">
            <Label>Category Name</Label>
            <Input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          {/* ...existing code... */}
        </CredenzaBody>
        <CredenzaFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            Update Category
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

export default UpdatCat
