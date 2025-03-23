"use client";

import { CartProvider } from '@/app/[locale]/context/CartContext';

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}