import type { JSX } from "react"

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear()

  return (
    <footer className="px-8 md:px-16 lg:px-24 py-6 border-t border-[#141414] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <span className="font-mono text-[0.65rem] md:text-[0.7rem] text-[#7a7a7a] tracking-[0.25em] uppercase">
        © {year} Aditya Thukral. All rights reserved.
      </span>
      <span className="font-mono text-[0.65rem] md:text-[0.7rem] text-[#555555] tracking-[0.25em] uppercase">
        If you find a bug, its a feature, trust 💀
      </span>
    </footer>
  )
}
