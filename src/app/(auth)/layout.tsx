import { PageRoutes } from '@/constants/page-routes';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(PageRoutes.DASHBOARD);
  }

  return (
    <main className="flex min-h-screen items-center p-2 md:p-4 bg-blue-gem-100">{children}</main>
  );
}

export default Layout