import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import React from 'react'

import db from '@/lib/db'
import AddAuditReport from './AddAuditReport'
import EditAuditReport from './EditAuditReport'
import DeleteAuditReport from './DeleteAuditReport'

const getAllAuditreport = async () => {
  return await db.auditReport.findMany({})
}

const AuditReport = async () => {
  const all = await getAllAuditreport()

  return (
    <AdminPageLayout title=''>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold mb-4'>
            {all?.length} Audit Report{all?.length !== 1 ? 's' : ''}
          </h1>
          <AddAuditReport/>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y '>
            <thead className=''>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  URL
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=' divide-y '>
              {all.map((report) => (
                <tr key={report.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{report.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {report.title}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <a 
                      href={report.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {report.url}
                    </a>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className="flex space-x-2">
                      <EditAuditReport report={report} />
                      <DeleteAuditReport report={report} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {all.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No audit reports found. Add your first report above.
            </div>
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default AuditReport