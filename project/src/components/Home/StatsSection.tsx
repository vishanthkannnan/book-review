import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Star, MessageCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: BookOpen,
      value: '10,000+',
      label: 'Books in Library',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Readers',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Star,
      value: '200,000+',
      label: 'Reviews & Ratings',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: MessageCircle,
      value: '95%',
      label: 'Satisfaction Rate',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Book Lovers Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our growing community of passionate readers who have made BookNest their go-to platform for book discoveries and reviews.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} mb-6 group-hover:shadow-lg transition-all duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <motion.h3
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-lg text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6 leading-relaxed">
              "BookNest has completely transformed how I discover and engage with books. The community reviews are incredibly helpful, and I've found so many hidden gems!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="https://images.pexels.com/photos/3771594/pexels-photo-3771594.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-gray-600">Avid Reader & Community Member</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;