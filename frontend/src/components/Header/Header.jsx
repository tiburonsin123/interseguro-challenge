export default function Header({ onLogout }) {
  return (
    <header className="bg-white border-b-4 border-blue-600 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-sm" />
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Interseguro</span>
          <span className="text-gray-300 text-xl">|</span>
          <span className="text-gray-500 text-sm font-medium">Factorización QR de Matrices</span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition font-medium"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
