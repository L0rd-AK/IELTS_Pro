"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart2, Library, Home, Menu, X, Info, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { AuthButtons } from "../ui/auth-buttons";
import { useAuth } from "@/contexts/auth-context";

const publicNavItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Blogs",
    href: "/blog",
    icon: BookOpen,
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: Info,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: MessageSquare,
  }
];

const protectedNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart2,
  },
  {
    name: "Test Selection",
    href: "/test-selection",
    icon: BookOpen,
  },
  {
    name: "Progress Tracking",
    href: "/progress-tracking",
    icon: BarChart2,
  },
  {
    name: "Resource Library",
    href: "/resource-library",
    icon: Library,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  // Determine which nav items to show based on authentication status
  const navItems = [...publicNavItems, ...(user ? protectedNavItems : [])];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-5 mx-auto supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">IELTS Pro</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <AuthButtons />
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <AuthButtons />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}