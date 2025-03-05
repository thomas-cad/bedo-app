"use client";

import React, { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import Banner from './components/Banner';
import Products from './components/Products';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Banner />
      <Products items={items} />
    </div>
  );
};

export default Shop;