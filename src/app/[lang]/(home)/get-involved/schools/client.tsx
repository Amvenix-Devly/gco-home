/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Medal, Network, Sprout } from 'lucide-react';

const features = [
  {
    title: 'Hands-on Learning',
    description: 'Interactive activities and real-world environmental projects that engage students in practical conservation efforts and outdoor learning experiences.',
    icon: Sprout,
    bgImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Curriculum Integration',
    description: 'Seamlessly integrate environmental education into your existing curriculum with our standards-aligned resources and lesson plans.',
    icon: BookOpen,
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Community Impact',
    description: 'Connect with local environmental initiatives and create meaningful change in your community through student-led projects.',
    icon: Network,
    bgImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Support Materials',
    description: 'Access comprehensive teaching resources, worksheets, and digital tools designed to enhance environmental education in your classroom.',
    icon: BookOpen,
    bgImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Regular Updates',
    description: 'Stay informed with monthly newsletters, progress reports, and new environmental education opportunities for your school.',
    icon: Clock,
    bgImage: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Recognition Program',
    description: "Earn certificates and awards for your school's environmental achievements and showcase your commitment to sustainability.",
    icon: Medal,
    bgImage: 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
];

const FeatureItem = ({ feature }: { feature: typeof features[0] }) => {
  const Animat = {
    hover: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const AnimatHr = {
    hover: {
      scale: 1,
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const AnimatTitle = {
    hover: {
      y: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div 
      whileHover="hover"
      className="relative h-48 rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-2"
    >
      <div className="absolute inset-0">
        <img
          src={feature.bgImage}
          alt={feature.title}
          className="w-full h-full object-cover group-hover:brightness-50 transition-all"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 p-6 text-white">
        <motion.div 
          variants={AnimatTitle}
          initial={{ y: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <feature.icon className="w-6 h-6" />
          <h3 className="text-xl font-bold">{feature.title}</h3>
        </motion.div>
        <motion.hr
          variants={AnimatHr}
          initial={{ scale: 0 }}
          className="h-[2px] bg-white w-full border-none mb-2"
        />
        <motion.p 
          variants={Animat}
          initial={{ opacity: 0, scale: 0.999, y: -20 }}
          className="text-sm text-white/90 line-clamp-4"
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Program Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
