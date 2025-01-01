/* eslint-disable @next/next/no-img-element */
import { School, TreePine, Users } from 'lucide-react'
import { FeaturesSection } from './client'
import { Facebook, Twitter, Youtube, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const getdata = async () => {
  try {
    const r = await fetch('https://gco-student.vercel.app/api/out')
    const data: { trees: number; users: number; institutes: number } =
      await r.json()
    return data
  } catch (error) {
    console.log(error)
    return { trees: 0, users: 0, institutes: 0 }
  }
}

const SchoolsPage = async () => {
  const data = await getdata()
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img
            src="/img/student/img1.jpg"
            alt="Students planting trees"
            className="object-cover w-full h-full  brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Environmental Education Program
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Empower your students to make a difference in their environment
          </p>
          <Button asChild>
            <a target="_blank" href="https://gco-student.vercel.app/">
              Join the Program
            </a>
          </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hover:text-green-500"
            >
              <item.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <impact.icon size={48} className="text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {data[impact?.name as keyof typeof data]}
                </div>
                <div className="text-gray-700">{impact.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Program Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Make a lasting impact on your students and the environment
          </p>
          <Button variant='outline' asChild>
            <a target="_blank" href="https://gco-student.vercel.app/">
              Get Started
            </a>
          </Button>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Get the Resources</h2>
          <p className="text-lg font-light mb-8">
            Fill out the form to get access to the program!
          </p>
          <form className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            />
            <Input
              type="text"
              placeholder="School Name"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white w-full py-3 rounded font-bold hover:bg-green-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

const impacts = [
  {
    name: 'trees',
    description: 'Trees Planted',
    icon: TreePine,
  },
  {
    name: 'institutes',
    description: 'Schools Involved',
    icon: School,
  },
  {
    name: 'users',
    description: 'Students Engaged',
    icon: Users,
  },
]

const socialLinks = [
  {
    href: 'mailto:hello@globalcommunityorganization.org',
    icon: Mail,
  },
  {
    href: 'https://www.facebook.com/GlobalCommunityOrganization',
    icon: Facebook,
  },
  {
    href: 'https://x.com/Global_Com_Org',
    icon: Twitter,
  },
  {
    href: 'https://youtube.com/@globalcommunityorganization?si=4emJ0AAcpVYRhpkZ',
    icon: Youtube,
  },
]

export default SchoolsPage
