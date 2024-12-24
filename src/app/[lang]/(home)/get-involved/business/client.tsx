/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { TreePine, Sprout,   Trees } from 'lucide-react'
import { Input } from '@/components/ui/input'

const tiers = [
  {
    icon: Sprout,
    title: 'Tier One',
    price: '$10K to $25K per year',
    description: "As a Tier One, you're a catalyst for change. Your $10K to $25K contribution sparks environmental action. Enjoy dedicated support from an Account Manager, a 'Proud Supporter' logo, and social media graphics to inspire others and share your commitment to reforestation."
  },
  {
    icon: TreePine,
    title: 'Tier Two',
    price: '$25K to $100K per year',
    description: 'As a Tier Two, your $25K to $100K donation reflects a profound commitment to the planet. Gain access to a Commercial Co-Venture (CCV) agreement, a Lunch and Learn session, your brand on our Supporter page, and a robust suite of marketing materials to amplify your impact.'
  },
  {
    icon: TreePine,
    title: 'Tier Three',
    price: '$100K to $500K per year',
    description: 'Tier Three, your $100K to $500K donation puts you at the forefront of environmental leadership. In addition to previous benefits, enjoy custom tree-planting events, a personalized Donor Portal, year-end Impact Report, and marketing support to showcase your commitment.'
  },
  {
    icon: Trees,
    title: 'Tier Four',
    price: '$500K+ per year',
    description: 'As a Tier Four, your $500K+ contribution drives large-scale sustainability. Receive a mid-year Impact Report, be spotlighted on our Business Sustainability page, and feature your corporate responsibility through a testimonial and press release, inspiring others to follow your lead.'
  }
];

export const PricingTiers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {tiers.map((tier, index) => (
        <div key={index} className="text-center">
          <div className="mb-6">
            <tier.icon 
              className="w-24 h-24 mx-auto text-green-600 dark:text-green-400"
              strokeWidth={1.5}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {tier.title}
            </h3>
            <h4 className="text-lg font-bold text-green-600 mb-4">
              {tier.price}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {tier.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HoverBoxes = () => {
  const boxes = [
    {
      number: '1',
      title: 'Scalable Impact',
      description: 'Make a tangible difference at any giving level.',
    },
    {
      number: '2',
      title: 'Sustainability',
      description: 'Align your organizational goals with global Sustainable Development Goals (SDGs).',
    },
    {
      number: '3',
      title: 'Brand Enhancement',
      description: "Strengthen your brand's commitment to the environment by planting trees and restoring landscapes.",
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h3 className="text-3xl font-bold mb-4 dark:text-white">
          Drive Global Impact Through Reforestation
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Since our establishment in 2014, we've been committed to simplifying environmental contributions for individuals and businesses. With your support, we drive environmental conservation and global reforestation efforts.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          From small businesses to Fortune 500 companies, we make reforestation at the core of our operations. Our flexibility and tailored solutions allow your business to create a healthier climate, protect biodiversity, and make a difference.
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Get in touch
        </button>
      </div>

      <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
        {boxes.map((box, index) => (
          <div 
            key={index}
            className="group border-b border-gray-200/25 dark:border-gray-700/25 last:border-b-0 p-6 transition-all duration-200 hover:bg-white/75 dark:hover:bg-zinc-700/75"
          >
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-600/75 dark:bg-gray-500/75 text-white 
                ${index === 0 ? 'group-hover:bg-green-500 dark:group-hover:bg-green-600' : 
                  index === 1 ? 'group-hover:bg-yellow-500 dark:group-hover:bg-yellow-600' : 
                  'group-hover:bg-blue-500 dark:group-hover:bg-blue-600'} 
                transition-colors`}
              >
                {box.number}
              </div>
              <h4 className={`text-xl font-bold uppercase text-gray-600/75 dark:text-gray-400 
                ${index === 0 ? 'group-hover:text-green-500 dark:group-hover:text-green-400' : 
                  index === 1 ? 'group-hover:text-yellow-500 dark:group-hover:text-yellow-400' : 
                  'group-hover:text-blue-500 dark:group-hover:text-blue-400'} 
                transition-colors`}
              >
                {box.title}
              </h4>
            </div>
            <p className="mt-0 h-0 opacity-0 group-hover:h-auto group-hover:mt-4 group-hover:opacity-100 transition-all duration-200 ml-14 text-gray-600 dark:text-gray-300">
              {box.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [10, 20, 50, 100];

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount) {
      alert('Please select or enter an amount');
      return;
    }
    // Add your donation logic here
    console.log('Donating:', amount);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 shadow-lg md:w-96">
      <h3 className="text-xl font-bold mb-4 text-white">Make a Difference Today</h3>
      <p className="text-gray-100 mb-6">
        Your donation helps us plant more trees and create a sustainable future.
      </p>
      
      {/* Preset Amounts */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {donationAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`py-2 px-4 transition-colors
              ${selectedAmount === amount
                ? 'bg-green-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mb-6">
        <Input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
          className="w-full bg-white/10 text-white placeholder:text-gray-300 border-white/20"
        />
      </div>

      {/* Donate Button */}
      <button 
        onClick={handleDonate}
        className="w-full bg-green-600 text-white py-3 px-6 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <TreePine className="w-5 h-5" />
        <span>Donate Now</span>
      </button>
    </div>
  );
};