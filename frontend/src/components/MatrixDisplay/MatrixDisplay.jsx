export default function MatrixDisplay({ title, subtitle, matrix, accent, labelColor }) {
  if (!matrix || matrix.length === 0) return null

  return (
    <div className={`bg-white rounded-2xl shadow p-5 border-t-4 ${accent}`}>
      <div className="mb-3">
        <p className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{title}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>

      <div className="font-mono text-sm overflow-x-auto">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {row.map((val, j) => (
              <span
                key={j}
                className="inline-block w-20 text-right text-gray-700 px-1 tabular-nums"
              >
                {Number(val).toFixed(4)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
