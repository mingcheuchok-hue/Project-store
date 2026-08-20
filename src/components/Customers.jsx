import React, { useState, useEffect, useRef } from 'react';

const Customers = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Blogger',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      review: 'Absolutely love my new jacket! The quality is exceptional and the fit is perfect. CStore has become my go-to for stylish clothing.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      review: 'The best online shopping experience I\'ve ever had. Fast shipping, great prices, and the customer service is outstanding!',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Fitness Instructor',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4,
      review: 'Great quality activewear! The fabric is breathable and comfortable. Perfect for my workouts and daily wear.',
      date: '3 weeks ago'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Entrepreneur',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5,
      review: 'CStore offers premium products at affordable prices. I\'ve recommended them to all my friends and family.',
      date: '5 days ago'
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      role: 'Art Director',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      rating: 5,
      review: 'The attention to detail in every product is amazing. The packaging was beautiful and the quality exceeded my expectations.',
      date: '2 weeks ago'
    },
    {
      id: 6,
      name: 'Robert Wilson',
      role: 'Marketing Manager',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 4,
      review: 'Great selection of products. The return policy is hassle-free and the support team is very responsive.',
      date: '1 week ago'
    }
  ];

  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || customers.length === 0 || isPaused) return;

    let animationId;
    let startTime;
    const duration = 40000;
    const scrollDistance = container.scrollWidth / 2;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const scrollPosition = (progress * scrollDistance) % scrollDistance;
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animateScroll);
    };

    animationId = requestAnimationFrame(animateScroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [customers, isPaused]);

 
  const duplicatedCustomers = [...customers, ...customers, ...customers];
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-3.5 h-3.5 ${index < rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`}
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          Testimonials
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
          What Our Customers Say
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Join thousands of satisfied customers who trust CStore
        </p>
      </div>

      {/* Scrollable Customers Row */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth py-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {duplicatedCustomers.map((customer, index) => (
            <div
              key={`${customer.id}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Customer Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {customer.name}
                  </h4>
                  <p className="text-xs text-gray-400">{customer.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {renderStars(customer.rating)}
                <span className="text-xs text-gray-400 ml-2">{customer.date}</span>
              </div>

              {/* Review */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                "{customer.review}"
              </p>

              {/* Quote icon */}
              <div className="mt-3 text-blue-600 opacity-20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.951c-2.664.887-4.548 2.913-4.548 5.122h4.552v10.927h-9.982zm-10.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.951c-2.664.887-4.548 2.913-4.548 5.122h4.552v10.927h-9.982z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-1.5 mt-6">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">4.9<span className="text-blue-600">★</span></div>
          <p className="text-sm text-gray-500 mt-1">Average Rating</p>
        </div>
        <div className="text-center sm:border-l sm:border-r border-gray-100">
          <div className="text-3xl font-bold text-gray-900">2,500<span className="text-blue-600">+</span></div>
          <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">98<span className="text-blue-600">%</span></div>
          <p className="text-sm text-gray-500 mt-1">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default Customers;