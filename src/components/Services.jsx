import React from 'react';

const Services = () => {
  const services = [
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-['Inter',sans-serif]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
          Why Choose Us
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">
          Premium Services
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Experience the best shopping experience with our premium services
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="group relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Subtle background gradient on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-blue-50/10 transition-all duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center">
              {/* Icon with gradient background */}
              <div className="flex-shrink-0 p-3.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight mt-4 mb-1.5">
                {service.title}
              </h3>
              
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                {service.description}
              </p>

              {/* Decorative line on hover */}
              <div className="w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 mt-4 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;