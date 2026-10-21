export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3.2" fill="currentColor" />
      <path d="M6.5 18.5c1.3-2.2 3.2-3.3 5.5-3.3s4.2 1.1 5.5 3.3" fill="currentColor" />
    </svg>
  )
}

export function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
      <path d="M7 10h13M7.8 12.5h11.5M10 7v8.4M13.5 7v8.4M17 7v8.4" strokeWidth="1" />
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </svg>
  )
}

export function CartAddIcon() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
      <path d="M13.5 7.5v5m-2-2 2 2 2-2" style={{ stroke: 'var(--color-acento)' }} strokeWidth="2" />
    </svg>
  )
}

export function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
  )
}

export function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  )
}

export function ImageIcon() {
  return (
    <svg viewBox="0 0 120 90" fill="currentColor" aria-hidden="true">
      <circle cx="30" cy="28" r="12" />
      <path d="M12 80 52 34l22 26 12-12 22 32Z" />
    </svg>
  )
}

export function ChevronDownIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

