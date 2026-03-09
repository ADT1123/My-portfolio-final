import type { JSX } from "react"

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear()

  return (
    <footer className="px-8 md:px-16 lg:px-24 py-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <span className="font-mono text-xs text-[#bfbfbf] tracking-widest uppercase">
        © {year} Aditya Thukral. All rights reserved.
      </span>
      <span className="font-mono text-xs text-[#bfbfbf] tracking-widest uppercase">
        Every bug you find was intentional. Trust the process. 💀
      </span>
    </footer>
  )
}
