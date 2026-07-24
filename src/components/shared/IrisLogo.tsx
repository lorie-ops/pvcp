export default function IrisLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="62" r="48" stroke="#4338ca" strokeWidth="4" />
      <path
        d="M 64 16
           C 38 10, 13 28, 13 56
           C 13 74, 26 87, 42 90"
        stroke="#4338ca"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 64 16
           C 82 21, 90 38, 79 51
           C 94 55, 91 66, 78 68
           C 83 80, 70 90, 52 89"
        stroke="#4338ca"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 70 38 C 72 36, 76 36, 78 38" stroke="#4338ca" strokeWidth="3" strokeLinecap="round" />
      <path d="M 32 17 C 43 7, 77 7, 90 20" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
