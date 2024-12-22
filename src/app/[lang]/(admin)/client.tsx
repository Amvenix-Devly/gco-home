'use client'
import AdminNav from '@/components/custom/admin/shared/Nav';
import ThemeProviderClient from '@/components/shared/theme-provider';
import dynamic from 'next/dynamic';
import { ReactNode, useState } from "react";


const AdminSideBar = dynamic(
  () => import('@/components/custom/admin/shared/SideBar'),
  { ssr: false }
)

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false)
  return (
    <ThemeProviderClient
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <AdminSideBar toggled={toggled} setToggled={setToggled} />
        <main className="w-full h-[98vh] overflow-y-auto">
          <AdminNav toggled={toggled} setToggled={setToggled} />
          {children}
        </main>
      </div>
    </ThemeProviderClient>
  )
}