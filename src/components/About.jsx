import React from 'react';

const About = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On orders over $50. Fast delivery within 2-3 business days.'
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Payment',
      description: '100% secure payments with industry-standard encryption.'
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Easy Returns',
      description: '30-day hassle-free returns. No questions asked.'
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock.'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Passionate about creating the best shopping experience.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Creative visionary with a love for minimalist design.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Tech enthusiast building innovative solutions.'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Customer Success',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      bio: 'Dedicated to ensuring customer satisfaction.'
    }
  ];

  const stats = [
    { id: 1, number: '10K+', label: 'Happy Customers' },
    { id: 2, number: '24/7', label: 'Support Available' },
    { id: 3, number: '100%', label: 'Success Guarantee' },
    { id: 4, number: '30 Days', label: 'Easy Returning' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          About Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mt-4">
          Your Trusted Online Store
        </h1>
        <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
          We are dedicated to providing you with the best shopping experience. 
          From premium products to exceptional customer service, we're here to 
          make your journey enjoyable and seamless.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {stat.number}
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
            Premium Services
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mt-3">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Our Story
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
            Built on Passion & Quality
          </h2>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            Founded in 2020, CStore began with a simple mission: to bring 
            high-quality products to customers at affordable prices. What 
            started as a small online shop has grown into a trusted destination 
            for fashion, electronics, and lifestyle products.
          </p>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            We believe in curating collections that reflect the latest trends 
            while maintaining timeless quality. Our team works tirelessly to 
            ensure every product meets our high standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quality Guaranteed
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure Shopping
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fast Delivery
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Our Story"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Since 2020</div>
                  <div className="text-xs text-gray-500">Trusted by thousands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            To empower individuals through exceptional products that enhance 
            their lifestyle. We strive to create a seamless shopping experience 
            that brings joy and convenience to every customer.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Vision</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            To become the world's most trusted online shopping destination, 
            known for quality, innovation, and customer-centric values that 
            inspire confidence and loyalty.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Our Team
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
            Meet the People Behind CStore
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Passionate individuals dedicated to your shopping experience
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="relative bg-gray-50 h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-xs text-blue-600 font-medium">
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Ready to Shop With Us?
        </h2>
        <p className="text-blue-100 mt-2 max-w-md mx-auto">
          Join thousands of satisfied customers and experience the best online shopping.
        </p>
        <button
          onClick={() => window.location.href = '/products'}
          className="mt-6 px-8 py-3 bg-white text-blue-600 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
        >
          Browse Products
        </button>
      </div>
    </section>
  );
};

export default About;