import Link from "next/link"
import { Logo } from "./Logo"

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 mt-auto relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 transform-gpu overflow-hidden blur-3xl -z-10" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-foreground/70 max-w-xs">
              Empowering women through career opportunities and professional growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/women/jobs"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/women/events"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-foreground/70 hover:text-secondary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-foreground/70 hover:text-secondary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/70 hover:text-secondary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors hover:underline decoration-accent/30 underline-offset-4"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors hover:underline decoration-accent/30 underline-offset-4"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/70">© 2024 WomenRise. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-foreground/70 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-foreground/70 hover:text-secondary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-foreground/70 hover:text-accent transition-colors hover:underline decoration-accent/30 underline-offset-4"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

