import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { ReactElement } from 'react'
import { ClientLayout } from './client'
import NoPermission from './NoPermission'
import { Role } from '@prisma/client'


const AdminLayout = async ({ children }: { children: ReactElement }) => {
  const { data } = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })
  const user: any = data?.user
  if (!user || user?.type !== Role.ADMIN) {
    return <NoPermission />
  }
  return <ClientLayout>{children}</ClientLayout>
}
export default AdminLayout
