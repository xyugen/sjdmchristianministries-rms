import React from 'react'

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className="flex min-h-screen items-center p-4">{children}</main>
  );
}

export default Layout