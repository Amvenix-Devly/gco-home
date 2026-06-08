import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { ClientLayout } from './client'
import NoPermission from './NoPermission'

const AdminLayout = async ({ children }: { children: ReactNode }) => {
    const { data } = await getSession({
        fetchOptions: {
            headers: await headers(),
        },
    })
    const user: any = data?.user
    if (!user || user?.type !== 'ADMIN') {
        return <NoPermission />
    }
    return <ClientLayout>{children}</ClientLayout>
}

export default AdminLayout