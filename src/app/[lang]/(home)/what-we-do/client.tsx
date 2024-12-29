'use client'
import {
  SweetchLayoutContent,
  SweetchLayoutSidebar,
  Switch,
  SwitchLayoutParant,
} from '@/components/shared/SwitchLayout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const View = ({ data }: any) => {
  const keys = Object.keys(data)
  const [active, setActive] = useState(keys[0])
  const curentItem = data[active]
   useEffect(() => {
      window.scrollTo(0, 0)
      const x = decodeURI(
        window.location.hash?.split('#')[1]
          ? window.location.hash?.split('#')[1]
          : keys[0]
      )
      setActive(x)
    }, [])

  return (
    <SwitchLayoutParant className="mt-5">
      <SweetchLayoutSidebar>
        {keys.map((key: any) => (
          <Switch
            className="capitalize text-start"
            key={key}
            active={active === key}
            onClick={() => setActive(key)}
          >
            {key}
          </Switch>
        ))}
      </SweetchLayoutSidebar>
      <SweetchLayoutContent>
        <div className="m-5">
          {curentItem.map((item: any, index: number) => (
            <div key={index} className="mb-10">
              <DilogView
                fileName={item?.desc}
                slogan={item?.slogan}
                title={item?.title}
              />
              <p className='font-light'>{item.slogan}</p>
            </div>
          ))}
        </div>
      </SweetchLayoutContent>
    </SwitchLayoutParant>
  )
}

const DilogView = ({
  fileName,
  title,
  slogan,
}: {
  title: string
  fileName: string
  slogan: string
}) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/md/${fileName}`)
        const data = await response.text()
        setContent(data)
      } catch (error) {
        console.error('Error fetching markdown:', error)
      }finally{
        setLoading(false)
      }
    }

    fetchMarkdown()
  }, [fileName])

  return (
    <Dialog>
      <DialogTrigger className={cn(loading && "pointer-events-none cursor-not-allowed animate-pulse")}>
        <h2 className="text-2xl font-semibold capitalize hover:underline text-start">{title}</h2>
      </DialogTrigger>
      <DialogContent className="md:w-[90vw] max-w-[90vw] bg-white dark:bg-black">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{slogan}</DialogDescription>
        </DialogHeader>
        <div className="prose dark:prose-invert max-w-none overflow-y-auto max-h-[80vh] p-4 scrollbar-thin">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default View
