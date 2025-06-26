import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Star, Heart, Target, Lightbulb, Globe } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3771594/pexels-photo-3771594.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Passionate reader with 15+ years in tech. Founded BookNest to create the ultimate community for book lovers.',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/3771605/pexels-photo-3771605.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former librarian turned product manager. Believes in the power of technology to connect readers worldwide.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/3771608/pexels-photo-3771608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Book blogger and community builder. Dedicated to fostering meaningful conversations about literature.',
    },
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Love for Literature',
      description: 'We believe books have the power to transform lives, spark imagination, and connect people across cultures.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our platform is built by readers, for readers. Every feature is designed to enhance your reading journey.',
    },
    {
      icon: Star,
      title: 'Quality Reviews',
      description: 'We encourage thoughtful, honest reviews that help fellow readers discover their next favorite book.',
    },
    {
      icon: Heart,
      title: 'Inclusive Space',
      description: 'BookNest welcomes readers of all backgrounds, genres, and reading levels. Everyone has a voice here.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              About BookNest
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to create the world's most vibrant community of book lovers, 
              where every reader can discover, share, and celebrate the stories that move them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  BookNest was born from a simple observation: while there are countless books in the world, 
                  finding the right one at the right time can be surprisingly difficult. We wanted to change that.
                </p>
                <p>
                  Founded in 2024 by a team of passionate readers and technologists, BookNest combines the 
                  intimacy of a local book club with the reach of a global community. We believe that the 
                  best book recommendations come from real readers sharing genuine experiences.
                </p>
                <p>
                  Today, we're proud to host thousands of book lovers from around the world, each contributing 
                  to a growing library of authentic reviews, thoughtful discussions, and meaningful connections.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50K+</div>
                    <div className="text-purple-100">Active Readers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">200K+</div>
                    <div className="text-purple-100">Book Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10K+</div>
                    <div className="text-purple-100">Books Cataloged</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-purple-100">User Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at BookNest, from product development to community management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate readers and builders behind BookNest, working to create the best possible experience for our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center space-x-4 mb-8">
              <Target className="w-12 h-12 text-white" />
              <Lightbulb className="w-12 h-12 text-white" />
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              To democratize book discovery by creating a platform where every reader's voice matters, 
              where authentic reviews guide meaningful choices, and where the love of reading brings 
              people together across all boundaries.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-lg text-white/90 italic">
                "We envision a world where no great book goes undiscovered, and no reader feels alone in their literary journey."
              </p>
              <p className="text-white font-semibold mt-4">- The BookNest Team</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;