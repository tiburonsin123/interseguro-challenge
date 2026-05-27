export default function ErrorAlert({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
      <svg className="h-5 w-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-red-700 text-sm font-medium">{message}</p>
    </div>
  )
}
