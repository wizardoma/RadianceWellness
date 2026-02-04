"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@radiance/utils";
import { Button } from "@radiance/ui";
import { serviceCategories } from "@radiance/mock-data";

const navItems = [
  {
    label: "Services",
    href: "/services",
    children: serviceCategories.map((cat) => ({
      label: cat.name,
      href: `/services/${cat.slug}`,
      description: cat.description,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Pages with dark hero sections where navbar should start transparent
const darkHeroPages = ["/", "/about", "/contact"];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  // Check if current page has a dark hero section
  const hasDarkHero = darkHeroPages.includes(pathname);
  
  // Show solid navbar if scrolled OR if page doesn't have dark hero
  const showSolidNavbar = isScrolled || !hasDarkHero;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showSolidNavbar
          ? "bg-white/95 backdrop-blur-md shadow-soft-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-display text-xl font-bold">R</span>
            </div>
            <span
              className={cn(
                "font-display text-xl font-semibold transition-colors",
                showSolidNavbar ? "text-primary-700" : "text-white"
              )}
            >
              Radiance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? showSolidNavbar
                        ? "text-primary-600 bg-primary-50"
                        : "text-white bg-white/20"
                      : showSolidNavbar
                        ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-white shadow-soft-xl border border-border p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            <span className="block text-sm font-medium text-gray-900">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="block text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:+2348001234567"
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                showSolidNavbar ? "text-gray-600" : "text-white/90"
              )}
            >
              <Phone className="h-4 w-4 mr-1.5" />
              <span className="hidden xl:inline">+234 800 123 4567</span>
            </a>
            <Button asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button size="sm" asChild className="mr-2">
              <Link href="/book">Book</Link>
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showSolidNavbar
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-5 w-5" />}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border mt-4">
                <a
                  href="tel:+2348001234567"
                  className="flex items-center px-4 py-3 text-gray-600"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  +234 800 123 4567
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
