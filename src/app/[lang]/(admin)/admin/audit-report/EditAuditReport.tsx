'use client'

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateAuditReport } from './action'

interface EditAuditReportProps {
  report: {
    id: number
    title: string
    url: string
  }
}

const EditAuditReport = ({ report }: EditAuditReportProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const result = await updateAuditReport(report.id, formData)
      if (result.success) {
        setOpen(false)
      } else if (result.error) {
        alert(result.error)
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Edit Audit Report</CredenzaTitle>
          <CredenzaDescription>
            Update the audit report information.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={report.title}
                placeholder="Enter report title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                defaultValue={report.url}
                placeholder="Enter report URL"
                required
              />
            </div>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Report'}
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

export default EditAuditReport
