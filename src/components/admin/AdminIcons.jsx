function Svg({ children, size = 20, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}
    >
      {children}
    </svg>
  )
}

export const IconHome = (p) => (
  <Svg {...p}><path d="M3 11 12 3l9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></Svg>
)
export const IconBox = (p) => (
  <Svg {...p}><path d="M12 2 3 7v10l9 5 9-5V7z" /><path d="m3 7 9 5 9-5M12 12v10" /></Svg>
)
export const IconTag = (p) => (
  <Svg {...p}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </Svg>
)
export const IconCart = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
  </Svg>
)
export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.9.7 3.1 2.5 3.5 5.2" />
  </Svg>
)
export const IconChart = (p) => (
  <Svg {...p}><path d="M4 20V10M10 20V4M16 20v-8M21 20H3" /></Svg>
)
export const IconLogout = (p) => (
  <Svg {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" />
  </Svg>
)
export const IconSearch = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
)
export const IconUserCircle = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" />
    <path d="M6.2 18.4a7 7 0 0 1 11.6 0" />
  </Svg>
)
export const IconMenu = (p) => <Svg {...p}><path d="M3 6h18M3 12h18M3 18h18" /></Svg>
export const IconChevronDown = (p) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
export const IconChevronRight = (p) => <Svg {...p}><path d="m9 6 6 6-6 6" /></Svg>
export const IconChevronLeft = (p) => <Svg {...p}><path d="m15 6-6 6 6 6" /></Svg>
export const IconPlus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
export const IconClose = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
export const IconPencil = (p) => (
  <Svg {...p}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></Svg>
)
export const IconTrash = (p) => (
  <Svg {...p}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /><path d="M10 11v6M14 11v6" />
  </Svg>
)
export const IconImage = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" />
    <path d="m21 17-5-5-9 8" />
  </Svg>
)