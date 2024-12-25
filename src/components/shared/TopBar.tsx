'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from '@/lib/auth-client'
import {
  Facebook,
  Mail,
  ShoppingBag,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TopBar = () => {
  const { data } = useSession() as any
  const user = data?.user
  const {refresh} = useRouter()
  const hendelLogout = async () => {
    await signOut()
    refresh()
  }
  return (
    <section className="bg-main2 hidden md:block">
      <div className="container flex justify-between h-10 items-center">
        <div className="flex items-center text-white gap-5 text-xs uppercase">
          <div className="flex items-center topsocial gap-4 [&>*]:text-white [&>a>svg]:size-4 ml-2 ">
            <a href="mailto:hello@globalcommunityorganization.org">
              <Mail />
            </a>

            <a href="https://www.facebook.com/GlobalCommunityOrganization">
              <Facebook />
            </a>
            <a href="https://x.com/Global_Com_Org">
              <Twitter />
            </a>

            <a href="https://youtube.com/@globalcommunityorganization?si=4emJ0AAcpVYRhpkZ">
              <Youtube />
            </a>
            {/* <a href="#">
              <Linkedin />
            </a> */}
          </div>
          <p className="">+8801760870070</p>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/newsletter">Newsletter</Link>
        </div>
        <div className="flex gap-3 items-center text-white uppercase text-sm">
          <Link
            href="/donation"
            className="bg-white  text-bgMain h-10 px-3 flex items-center hover:bg-bgMain hover:text-white"
          >
            Donate
          </Link>
          <>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <h1 className="font-bold cursor-pointer">{user.name}</h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 dark:bg-bgMain">
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={hendelLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className=" h-10 px-1 flex items-center gap-2 hover:text-black"
                href="/join"
              >
                <User className="size-4" />
                Login
              </Link>
            )}
          </>
          <button
            className="flex gap-1 items-center bg-white  text-bgMain hover:bg-bgMain hover:text-white h-10 px-2"
          >
            <ShoppingBag className="size-5" />0
          </button>
        </div>
      </div>
    </section>
  )
}
export default TopBar
