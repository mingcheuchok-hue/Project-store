import React, { useState, useEffect } from 'react';

const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tag: 'COLLECTION 2026',
      title: 'Summer Essentials',
      description: 'Lightweight fabrics and minimal silhouettes crafted for warm weather.',
      cta: 'Shop Collection'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tag: 'OUTERWEAR',
      title: 'Winter Wear',
      description: 'Layering essentials designed for insulation, clarity, and style.',
      cta: 'Explore Coats'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tag: 'PERFORMANCE',
      title: 'Activewear',
      description: 'Technical apparel focused on flexibility and modern minimalist aesthetics.',
      cta: 'Discover Gear'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-['Inter',sans-serif]">
      <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[480px]">
          
          {/* Content Panel */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3">
              {slides[currentIndex].tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 transition-all duration-500">
              {slides[currentIndex].title}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md">
              {slides[currentIndex].description}
            </p>
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200 shadow-sm"
              >
                {slides[currentIndex].cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Panel */}
          <div className="relative h-64 md:h-full min-h-[320px] order-1 md:order-2 overflow-hidden bg-gray-50">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover transition-opacity duration-700 hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent md:from-transparent"></div>
          </div>

        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-8 flex items-center gap-4">
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-gray-400 tracking-wider ml-2">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-sm hidden sm:block"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-sm hidden sm:block"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SlideShow;