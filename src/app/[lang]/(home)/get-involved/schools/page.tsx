/* eslint-disable @next/next/no-img-element */
import { School, TreePine, Users } from 'lucide-react';
import { FeaturesSection } from './client';

const SchoolsPage = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img
            src="https://img.freepik.com/free-photo/young-girl-measuring-sprouts-growing-home_23-2148831369.jpg?t=st=1734887199~exp=1734890799~hmac=85007d45eea6413ea3e5c3924d950c5b4d29e7e20a0e698e98a44423bb6777ec&w=1800"
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
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors">
            Join the Program
          </button>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <impact.icon size={48} className="text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {impact.number}
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
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

const impacts = [
  { 
    number: '1M+', 
    description: 'Trees Planted',
    icon: TreePine
  },
  { 
    number: '500+', 
    description: 'Schools Involved',
    icon: School
  },
  { 
    number: '50K+', 
    description: 'Students Engaged',
    icon: Users
  },
];

export default SchoolsPage;