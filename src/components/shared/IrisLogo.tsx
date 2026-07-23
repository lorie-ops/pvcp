export default function IrisLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="44" stroke="#818cf8" strokeWidth="4" />
      <path
        d="M 20 50 C 30 32, 70 32, 80 50 C 70 68, 30 68, 20 50 Z"
        stroke="#4f46e5"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="15" fill="#4f46e5" />
      <circle cx="54.5" cy="45.5" r="3.2" fill="white" />
      <path
        d="M 26 30 C 35 20, 65 20, 74 30"
        stroke="#f59e0b"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
