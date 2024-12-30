/* eslint-disable react/no-unescaped-entities */
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition, useRef } from 'react'
import { subscribeToNewsletter } from './action'
import { useState } from 'react'

export const Subscribe = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [subscriberName, setSubscriberName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    
    setError(null)
    setSuccess(false)
    
    startTransition(async () => {
      const result = await subscribeToNewsletter({
        email: formData.get('email') as string,
        name: name
      })
      
      if (result.error) {
        setError(result.error)
      } else {
        setSubscriberName(name)
        setSuccess(true)
        formRef.current?.reset()
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="mt-5 flex flex-col md:flex-row gap-3 md:gap-5 md:items-end">
        <div className="flex-1">
          <Label>Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex-1">
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <Button
          variant="outline"
          className="mt-3 text-black dark:text-white"
          disabled={isPending}
        >
          {isPending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {success && (
        <div className="mt-2 text-sm text-green-500">
          <p className="font-medium">Thank you for subscribing, {subscriberName}! 🎉</p>
          <p>We're excited to keep you updated with our latest news and events.</p>
        </div>
      )}
    </form>
  )
}
