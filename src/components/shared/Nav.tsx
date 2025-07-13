import MobileNav from '../custom/Navigation/MobileNav'
import DesktopNav from '../custom/Navigation/DesktopNav'
import db from '@/lib/db'

const Nav = async () => {
  const all = await getAllAnnulreport()
  return (
    <section className='bg-main2 md:bg-bgMain md:text-white relative w-full'>
      <MobileNav annulLinks={all} />
      <DesktopNav annulLinks={all} />
    </section>
  )
}

const getAllAnnulreport = async () => {
  return await db.annulReport.findMany({})
}
export default Nav
