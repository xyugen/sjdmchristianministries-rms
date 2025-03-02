import React from 'react'

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className="flex min-h-screen items-center p-2 md:p-4 bg-blue-gem-100">{children}</main>
  );
}

export default Layout