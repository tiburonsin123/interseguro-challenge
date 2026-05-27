import { useState, useCallback } from 'react'

const ROWS_OPTIONS = [2, 3, 4, 5, 6]
const COLS_OPTIONS = [2, 3, 4]

function buildEmptyMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(''))
}

export default function MatrixInput({ onSubmit, loading }) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(2)
  const [values, setValues] = useState(() => buildEmptyMatrix(3, 2))

  const handleDimensionChange = useCallback((newRows, newCols) => {
    setRows(newRows)
    setCols(newCols)
    setValues(buildEmptyMatrix(newRows, newCols))
  }, [])

  const handleCellChange = (i, j, val) => {
    setValues(prev => {
      const next = prev.map(r => [...r])
      next[i][j] = val
      return next
    })
  }

  const fillRandom = () => {
    setValues(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.floor(Math.random() * 19) - 9 || 1)
      )
    )
  }

  const handleSubmit = () => {
    const matrix = values.map(row =>
      row.map(v => (v === '' ? 0 : parseFloat(v)))
    )
    const hasNaN = matrix.some(row => row.some(v => isNaN(v)))
    if (hasNaN) return alert('Todos los valores deben ser números')
    onSubmit(matrix)
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-5">Ingresar Matriz</h2>

      {/* Dimension selectors */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Filas (m)
          </label>
          <select
            value={rows}
            onChange={e => handleDimensionChange(Number(e.target.value), cols)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            {ROWS_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Columnas (n)
          </label>
          <select
            value={cols}
            onChange={e => handleDimensionChange(rows, Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            {COLS_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <button
          onClick={fillRandom}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition"
        >
          Valores aleatorios
        </button>
      </div>

      {/* Matrix grid */}
      <div className="mb-6 overflow-x-auto">
        {values.map((row, i) => (
          <div key={i} className="flex gap-2 mb-2">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                step="any"
                value={val}
                placeholder="0"
                onChange={e => handleCellChange(i, j, e.target.value)}
                className="w-14 h-12 text-center border border-gray-300 rounded-lg font-mono text-base outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Calculando...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l6 5-6 5V7z" />
            </svg>
            Calcular Factorización QR
          </>
        )}
      </button>
    </div>
  )
}
