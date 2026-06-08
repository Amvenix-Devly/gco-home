import Footer from '@/components/shared/Footer'
import Nav from '@/components/shared/Nav'
import ThemeProviderClient from '@/components/shared/theme-provider'
import TopBar from '@/components/shared/TopBar'
import { I18nProviderClient } from '@/locales/client'
import type { ReactNode } from 'react'  // ← পরিবর্তন
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import db from '@/lib/db'

const getAllAuditreport = async () => {
    return await db.auditReport.findMany({})
}

const SubLayout = async ({
    params,
    children,
}: {
    params: any
    children: ReactNode  // ← পরিবর্তন
}) => {
    const { lang } = await params
    const all = await getAllAuditreport()
    return (
        <ThemeProviderClient
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <I18nProviderClient locale={lang}>
                <div className='fixed !w-full z-50'>
                    <TopBar />
                    <Nav />
                </div>
                <main className='md:pt-[97px] pt-[40px]'>{children}</main>
                <Footer fiReport={all} />
            </I18nProviderClient>
        </ThemeProviderClient>
    )
}

export default SubLayout