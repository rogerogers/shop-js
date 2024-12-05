import { NonAuthHeader } from '@/components/layout/header';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NonAuthHeader />
      {children}
    </>
  );
}
