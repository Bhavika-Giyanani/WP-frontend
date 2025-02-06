"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Jobs", href: "/women/jobs" },
    { name: "Events", href: "/women/events" },
  ]

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border/40">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative nav-link group ${pathname === item.href ? "text-primary font-semibold" : ""}`}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors mr-2"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 px-4 rounded-lg text-sm transition-colors ${
                    pathname === item.href ? "bg-primary/10 text-primary font-semibold" : "hover:bg-primary/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="grid gap-2 p-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header