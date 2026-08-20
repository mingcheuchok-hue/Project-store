import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Returns Policy', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'FAQs', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: getFacebookIcon(), href: '#' },
    { name: 'Twitter', icon: getTwitterIcon(), href: '#' },
    { name: 'Instagram', icon: getInstagramIcon(), href: '#' },
    { name: 'YouTube', icon: getYouTubeIcon(), href: '#' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: getVisaIcon() },
    { name: 'Mastercard', icon: getMastercardIcon() },
    { name: 'PayPal', icon: getPayPalIcon() },
    { name: 'Apple Pay', icon: getApplePayIcon() },
  ];

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <a href="#" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity inline-block">
              CStore<span className="text-blue-600">.</span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Premium clothing and accessories for the modern individual. Quality meets style.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-full px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            &copy; {currentYear} CStore. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">We accept:</span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.name}
                  className="p-1.5 bg-gray-50 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={method.name}
                >
                  {method.icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function getFacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function getTwitterIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function getInstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function getYouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function getVisaIcon() {
  return (
    <svg className="w-7 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <path d="M20.5 10.5L17.5 21.5H14.5L17.5 10.5H20.5Z" fill="white"/>
      <path d="M27.5 10.5C26.5 10.5 25.5 10.8 24.8 11.5C24.1 12.2 23.8 13.2 23.8 14.5C23.8 15.8 24.1 16.8 24.8 17.5C25.5 18.2 26.5 18.5 27.5 18.5C28.5 18.5 29.5 18.2 30.2 17.5L29.5 15.5C29 16 28.3 16.3 27.5 16.3C26.9 16.3 26.3 16.1 25.9 15.7C25.5 15.3 25.3 14.7 25.3 14C25.3 13.3 25.5 12.7 25.9 12.3C26.3 11.9 26.9 11.7 27.5 11.7C28.3 11.7 29 12 29.5 12.5L30.2 10.5C29.5 9.8 28.5 9.5 27.5 9.5V10.5Z" fill="white"/>
      <path d="M34 14.5L35.5 10.5H38.5L36.5 14.5L38.5 18.5H35.5L34 15.5L32.5 18.5H29.5L31.5 14.5L29.5 10.5H32.5L34 14.5Z" fill="white"/>
      <path d="M41.5 10.5C40.5 10.5 39.7 10.8 39.1 11.5C38.5 12.2 38.2 13.2 38.2 14.5C38.2 15.8 38.5 16.8 39.1 17.5C39.7 18.2 40.5 18.5 41.5 18.5C42.5 18.5 43.2 18.2 43.8 17.5L43.1 15.5C42.7 16 42.1 16.3 41.5 16.3C40.9 16.3 40.4 16.1 40 15.7C39.6 15.3 39.4 14.7 39.4 14C39.4 13.3 39.6 12.7 40 12.3C40.4 11.9 40.9 11.7 41.5 11.7C42.1 11.7 42.7 12 43.1 12.5L43.8 10.5C43.2 9.8 42.5 9.5 41.5 9.5V10.5Z" fill="white"/>
    </svg>
  );
}

function getMastercardIcon() {
  return (
    <svg className="w-7 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#F79E1B"/>
      <circle cx="18" cy="16" r="9" fill="#EB001B"/>
      <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
      <path d="M24 9.5C25.5 11 26.5 13.5 26.5 16C26.5 18.5 25.5 21 24 22.5C22.5 21 21.5 18.5 21.5 16C21.5 13.5 22.5 11 24 9.5Z" fill="#FF5F00"/>
    </svg>
  );
}

function getPayPalIcon() {
  return (
    <svg className="w-7 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#003087"/>
      <path d="M14.5 10.5L12.5 21.5H15.5L16.5 15.5H19.5C22.5 15.5 24.5 13.5 24.5 11.5C24.5 10.5 24.5 9.5 24.5 8.5L23.5 10.5H20.5C18.5 10.5 16.5 11.5 14.5 10.5Z" fill="#009CDE"/>
      <path d="M14.5 10.5L12.5 21.5H15.5L16.5 15.5H19.5C22.5 15.5 24.5 13.5 24.5 11.5C24.5 10.5 24.5 9.5 24.5 8.5L23.5 10.5H20.5C18.5 10.5 16.5 11.5 14.5 10.5Z" fill="#009CDE" fillOpacity="0.8"/>
      <path d="M23.5 8.5C21.5 8.5 19.5 9.5 18.5 10.5L16.5 10.5L14.5 10.5L12.5 21.5H15.5L16.5 15.5H19.5C22.5 15.5 24.5 13.5 24.5 11.5C24.5 10.5 24.5 9.5 23.5 8.5Z" fill="#012169"/>
    </svg>
  );
}

function getApplePayIcon() {
  return (
    <svg className="w-7 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1A1A"/>
      <path d="M15.5 12.5C15.5 11.5 16.5 10.5 17.5 10.5C18.5 10.5 19.5 11.5 19.5 12.5C19.5 13.5 18.5 14.5 17.5 14.5C16.5 14.5 15.5 13.5 15.5 12.5Z" fill="white"/>
      <path d="M25.5 14.5C25.5 13.5 26.5 12.5 27.5 12.5C28.5 12.5 29.5 13.5 29.5 14.5C29.5 15.5 28.5 16.5 27.5 16.5C26.5 16.5 25.5 15.5 25.5 14.5Z" fill="white"/>
      <path d="M21.5 10.5H23.5V21.5H21.5V10.5Z" fill="white"/>
      <path d="M31.5 10.5H33.5V21.5H31.5V10.5Z" fill="white"/>
    </svg>
  );
}

export default Footer;