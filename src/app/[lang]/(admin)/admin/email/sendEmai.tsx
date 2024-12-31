'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/Credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from 'lucide-react'
import { useRef, useState } from "react"
import { sendEmails } from "./action"

interface Subscriber {
  id: Number
  email: string
  name: string
}

interface SendEmailProps {
  subscribers: Subscriber[]
}

const SendEmail = ({ subscribers }: SendEmailProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectAll, setSelectAll] = useState(true)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    setSelectedEmails(checked ? [] : subscribers.map(s => s.email))
  }

  const handleSelectEmail = (email: string, checked: boolean) => {
    setSelectedEmails(prev => 
      checked 
        ? [...prev, email]
        : prev.filter(e => e !== email)
    )
  }

  const handleSendEmail = async () => {
    setLoading(true)
    const targetEmails = selectAll ? 'all' : selectedEmails
    console.log('Sending to:', targetEmails, 'Subject:', subject, 'Message:', message)
    await sendEmails({ emails: targetEmails, subject, message })
    setTimeout(() => {
      setLoading(false)
      setMessage('')
      setSubject('')
      closeRef?.current?.click()
    }, 2000)
  }

  const getErrorMessage = () => {
    if (!selectAll && selectedEmails.length === 0) {
      return "Please select at least one recipient"
    }
    if (!subject.trim()) {
      return "Subject is required"
    }
    if (!message.trim()) {
      return "Message is required"
    }
    return ""
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>
          <span className="hidden md:block">Send Email</span>
          <Mail className="size-5" />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Send Email to Subscribers</CredenzaTitle>
          <CredenzaDescription>
            Select recipients and write your message.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="selectAll" 
                checked={selectAll}
                onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
              />
              <label htmlFor="selectAll" className="text-sm font-medium">
                Send to everyone
              </label>
            </div>
            
            {!selectAll && (
              <ScrollArea className="h-[200px] border p-2 rounded">
                <div className="space-y-2">
                  {subscribers.map((subscriber) => (
                    <div key={subscriber.id as any} className="flex items-center space-x-2">
                      <Checkbox 
                        id={subscriber.id as any}
                        checked={selectedEmails.includes(subscriber.email)}
                        onCheckedChange={(checked: boolean) => 
                          handleSelectEmail(subscriber.email, checked)
                        }
                      />
                      <label htmlFor={subscriber.id as any} className="text-sm">
                        {subscriber.name} ({subscriber.email})
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            <div className="space-y-1">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
              />
            </div>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[200px]"
            />
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <div className="w-full space-y-4">
            {getErrorMessage() && (
              <p className="text-sm text-red-500 text-center">
                {getErrorMessage()}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button 
                onClick={handleSendEmail} 
                disabled={loading || !message.trim() || !subject.trim() || (!selectAll && selectedEmails.length === 0)}
              >
                {loading ? "Sending..." : "Send Email"}
              </Button>
              <CredenzaClose asChild>
                <Button ref={closeRef} variant="secondary">
                  Cancel
                </Button>
              </CredenzaClose>
            </div>
          </div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default SendEmail