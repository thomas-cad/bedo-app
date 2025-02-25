import React from 'react';
import { default as Banner } from './components/Banner';
import Products from './components/Products';
import { getItems } from '@/lib/prisma_GetItems'; // Import the data-fetching function

// Make this a Server Component (remove "use client")
const Shop = async () => {
  // Fetch data on the server
  const items = await getItems();

  return (
    <div>
      <Banner />
      <Products items={items} />
    </div>
  );
};

export default Shop;