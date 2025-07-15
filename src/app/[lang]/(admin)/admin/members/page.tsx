import React from 'react'
import AdminPageLayout from '@/components/custom/admin/shared/AdminPageLayout'
import { AddMemberType, EditMemberType, DeleteMemberType } from './MemberType'
import { MemberAdd, EditMember, DeleteMember } from './Member'
import db from '@/lib/db'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

const getAllMemberTypes = async () => {
  return await db.memberType.findMany({
    orderBy: { position: 'asc' }
  })
}

const getAllMembers = async () => {
  return await db.member.findMany({
    include: {
      type: true
    },
    orderBy: [
      { typeId: 'asc' },
      { position: 'asc' }
    ]
  })
}

const ManageMemberPage = async () => {
  const [memberTypes, members] = await Promise.all([
    getAllMemberTypes(),
    getAllMembers()
  ])

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="text-gray-600 mt-2">Manage your organization&apos;s member types and team members</p>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
            <TabsTrigger value="types">Member Types ({memberTypes.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Team Members</h2>
              <MemberAdd memberTypes={memberTypes} />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y ">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y ">
                  {members.map((member) => (
                    <tr key={member.id} className="">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {member.imageUrl ? (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                              <span className="text-gray-600 font-semibold">
                                {member.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium ">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {member?.type?.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        <div>
                          {member.email && (
                            <div className="text-sm ">{member.email}</div>
                          )}
                          {member.phone && (
                            <div className="text-sm text-gray-500">{member.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.previous 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {member.previous ? 'Former' : 'Current'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {member.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <EditMember member={member} memberTypes={memberTypes} />
                        <DeleteMember member={member} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {members.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No team members found. Add your first member above.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="types" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Member Types</h2>
              <AddMemberType />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y ">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y ">
                  {memberTypes.map((type) => {
                    const memberCount = members.filter(m => m.typeId === type.id).length
                    return (
                      <tr key={type.id} className="hover:">
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {type.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium ">
                            {type.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {type.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {memberCount} member{memberCount !== 1 ? 's' : ''}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <EditMemberType memberType={type} />
                          <DeleteMemberType memberType={type} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {memberTypes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No member types found. Add your first member type above.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageLayout>
  )
}

export default ManageMemberPage