'use client'

import { Button } from "@/components/ui/button"
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/Credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"
import { Plus } from 'lucide-react'
import { addCustomSubscriber } from "./action"
import { useRouter } from 'next/navigation'

export const AddCustomSubscriber = () => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  })
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    const newErrors = { name: '', email: '' }
    let isValid = true

    if (!name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      setLoading(false)
      return
    }

    const result = await addCustomSubscriber({ name, email })
    if (result.success) {
      setName('')
      setEmail('')
      refresh()
      closeRef?.current?.click()
    } else {
      setErrors({
        ...newErrors,
        email: result.error || 'Something went wrong'
      })
    }
    setLoading(false)
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>
          <span className="hidden md:block">Add Subscriber</span>
          <Plus className="size-5" />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add New Subscriber</CredenzaTitle>
          <CredenzaDescription asChild>
            <p className="text-muted-foreground">
              Add a new subscriber to your mailing list.
            </p>
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Subscriber"}
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