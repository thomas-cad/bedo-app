"use client";

import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Products from './Products';
import { Item } from '@/interfaces'

interface ReturnValue {
    items : Item[]
}

const Shop = ({ locale }: { locale: string }) => {
  const [items, setItems] = useState<ReturnValue>({items:[]});
  const [error, setError] = useState<string | null>(null);

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
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
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
      <Products items={items.items} locale={locale}/>
    </div>
  );
};
 
export default Shop;