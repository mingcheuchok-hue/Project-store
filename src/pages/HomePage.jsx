// src/pages/HomePage.jsx
import React from 'react';
import SlideShow from '../components/SlideShow';
import FeaturedProducts from '../components/FeaturedProducts';
import Customers from '../components/Customers';
import Services from '../components/Services';
import ProductDetail from '../components/ProductDetail';
import AllProducts from '../components/AllProducts';

const HomePage = () => {
  return (
    <>
      <SlideShow />
      <FeaturedProducts />
      <Customers />
      <Services />
    </>
  );
};

export default HomePage;