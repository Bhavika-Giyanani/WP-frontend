import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 bg-primary rounded-lg transform group-hover:rotate-6 transition-transform"></div>
        <div className="absolute inset-0 bg-secondary rounded-lg transform group-hover:-rotate-6 transition-transform opacity-70"></div>
        <div className="absolute inset-0 bg-accent rounded-lg transform transition-transform"></div>
        <span className="relative font-bold text-xl text-primary-foreground">W</span>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        WomenRise
      </span>
    </Link>
  )
}

