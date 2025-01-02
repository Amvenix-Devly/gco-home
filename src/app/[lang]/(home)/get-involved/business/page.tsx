import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Youtube, Mail } from 'lucide-react'
import { DonationCard, HoverBoxes, PricingTiers } from './client'

const BusinessPage = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1584257274862-42aa4f6e5f55?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Business sustainability"
          fill
          className="object-cover brightness-90 object-top"
        />
        <div className="relative z-10 w-[1000px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-8 px-4 md:items-center">
          {/* Hero Text */}
          <div className="text-center md:text-left text-white  sm:max-w-[500px]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Grow Your Impact
            </h1>
            <p className="text-xl mb-8">
              Achieve your business sustainability goals by planting trees.
            </p>
          </div>

          {/* Donation Card */}
          <DonationCard />
        </div>

        {/* Social Links */}
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

      {/* Hover Boxes Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <HoverBoxes />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Your Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{impact.number}</div>
                <p className="text-gray-600 dark:text-gray-300">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16 px-4 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Partnership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="border dark:border-zinc-700 rounded-lg p-6 hover:shadow-lg transition dark:bg-zinc-800">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center dark:text-gray-300">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#contact"
                  className="block text-center bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <PricingTiers />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Ready to Make an Impact?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Contact us to discuss partnership opportunities and start making a difference today.
          </p>
          <Link 
            href="mailto:partnerships@example.com"
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </main>
  )
}

const socialLinks = [
  {
    href: "mailto:hello@globalcommunityorganization.org",
    icon: Mail,
  },
  {
    href: "https://www.facebook.com/GlobalCommunityOrganization",
    icon: Facebook,
  },
  {
    href: "https://x.com/Global_Com_Org",
    icon: Twitter,
  },
  {
    href: "https://youtube.com/@globalcommunityorganization?si=4emJ0AAcpVYRhpkZ",
    icon: Youtube,
  },
];

const benefits = [
  {
    icon: '🌱',
    title: 'Environmental Impact',
    description: 'Make a measurable difference in environmental conservation efforts'
  },
  {
    icon: '🤝',
    title: 'Brand Alignment',
    description: 'Associate your brand with sustainable and responsible practices'
  },
  {
    icon: '📈',
    title: 'Employee Engagement',
    description: 'Boost team morale through meaningful environmental initiatives'
  }
]

const impacts = [
  { number: '50k+', description: 'Trees Planted' },
  { number: '5+', description: 'Corporate Partners' },
  { number: '1', description: 'Conservation Projects' },
  { number: '10k', description: 'Tonnes of CO2 Offset' }
]

const tiers = [
  {
    name: 'Seed',
    description: 'Perfect for small businesses starting their sustainability journey',
    features: [
      'Plant 100 trees monthly',
      'Impact report quarterly',
      'Digital badge for website',
      'Newsletter updates'
    ]
  },
  {
    name: 'Grove',
    description: 'Ideal for growing companies with broader sustainability goals',
    features: [
      'Plant 500 trees monthly',
      'Monthly impact reports',
      'Custom digital assets',
      'Employee engagement program',
      'Social media features'
    ]
  },
  {
    name: 'Forest',
    description: 'Comprehensive partnership for maximum environmental impact',
    features: [
      'Plant 1000+ trees monthly',
      'Custom impact dashboard',
      'Dedicated account manager',
      'On-site tree planting events',
      'PR collaboration opportunities'
    ]
  }
]

export default BusinessPage