// /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Users, Map, Download, Clock, LayoutDashboard, Home, LogOut } from "lucide-react";
import { createClient } from '@/lib/supabase-server';
import { signOut } from '@/login/actions';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlumConnect - Alumni Network Platform",
  description: "Connect with your alumni network",
};

// Update the NavBar function in layout.tsx for mock auth
async function NavBar() {
  const { cookies: getCookies } = await import('next/headers');
  const cookieStore = await getCookies();
  
  const userEmail = cookieStore.get('user-email')?.value;
  const userRole = cookieStore.get('user-role')?.value;
  const isAdmin = userRole === 'admin';
  const user = userEmail ? { email: userEmail } : null;

  // Rest of the NavBar code remains the same...


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AlumConnect
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                <Home className="w-4 h-4" />
                Home
              </Link>
              
              {/* Show these links for all logged-in users (both regular users and admins) */}
              {user && (
                <>
                  <Link href="/directory" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <Users className="w-4 h-4" />
                    Directory
                  </Link>
                  <Link href="/map" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <Map className="w-4 h-4" />
                    Map
                  </Link>
                  <Link href="/timeline" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <Clock className="w-4 h-4" />
                    Timeline
                  </Link>
                  <Link href="/export" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <Download className="w-4 h-4" />
                    Export
                  </Link>
                  
                  {/* Show admin link only for admin users */}
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  {isAdmin && (
                    <span className="text-xs text-blue-600 font-medium">Admin</span>
                  )}
                </div>
                <form action={signOut}>
                  <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {user && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link href="/directory" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                <Users className="w-4 h-4" />
                Directory
              </Link>
              <Link href="/map" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                <Map className="w-4 h-4" />
                Map
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                <Clock className="w-4 h-4" />
                Timeline
              </Link>
              <Link href="/export" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                <Download className="w-4 h-4" />
                Export
              </Link>
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}