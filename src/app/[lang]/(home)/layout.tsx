import Footer from '@/components/shared/Footer'
import Nav from '@/components/shared/Nav'
import ThemeProviderClient from '@/components/shared/theme-provider'
import TopBar from '@/components/shared/TopBar'
import { I18nProviderClient } from '@/locales/client'
import type { ReactElement } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const SubLayout = async ({
  params,
  children,
}: {
  params: any
  children: ReactElement
}) => {
  const { lang } = await params
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
        <Footer />
      </I18nProviderClient>
    </ThemeProviderClient>
  )
}

export default SubLayout
