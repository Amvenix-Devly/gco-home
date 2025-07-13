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
import { deleteAuditReport } from './action'

interface DeleteAuditReportProps {
  report: {
    id: number
    title: string
  }
}

const DeleteAuditReport = ({ report }: DeleteAuditReportProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteAuditReport(report.id)
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
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete Audit Report</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete this audit report? This action cannot be undone.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              <strong>Report to delete:</strong> {report.title}
            </p>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </CredenzaClose>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Report'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default DeleteAuditReport
