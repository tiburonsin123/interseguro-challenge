const STAT_CARDS = [
  { key: 'max',     label: 'Máximo',     bg: '#eff6ff', border: '#bfdbfe', lc: '#1d4ed8', vc: '#1e3a5f' },
  { key: 'min',     label: 'Mínimo',     bg: '#f0fdf4', border: '#bbf7d0', lc: '#15803d', vc: '#14532d' },
  { key: 'average', label: 'Promedio',   bg: '#faf5ff', border: '#e9d5ff', lc: '#7c3aed', vc: '#4c1d95' },
  { key: 'sum',     label: 'Suma Total', bg: '#fff7ed', border: '#fed7aa', lc: '#c2410c', vc: '#7c2d12' },
]

function DiagonalBadge({ name, isDiagonal }) {
  return (
    <span
      style={{
        background: isDiagonal ? '#dcfce7' : '#f3f4f6',
        color: isDiagonal ? '#15803d' : '#6b7280',
        padding: '0.25rem 0.85rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 700,
      }}
    >
      {isDiagonal ? '✓' : '✗'} {name} {isDiagonal ? 'es diagonal' : 'no es diagonal'}
    </span>
  )
}

export default function StatisticsPanel({ statistics }) {
  if (!statistics) return null

  const { diagonal, ...stats } = statistics

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
        Estadísticas sobre Q y R
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {STAT_CARDS.map(({ key, label, bg, border, lc, vc }) => (
          <div
            key={key}
            style={{ background: bg, border: `1px solid ${border}`, borderRadius: '1rem', padding: '1rem' }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: lc, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {label}
            </p>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: vc, marginTop: '0.25rem' }}>
              {Number(stats[key]).toFixed(4)}
            </p>
          </div>
        ))}
      </div>

      {diagonal && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-500">Verificación diagonal:</span>
          <DiagonalBadge name="Q" isDiagonal={diagonal.Q} />
          <DiagonalBadge name="R" isDiagonal={diagonal.R} />
        </div>
      )}
    </div>
  )
}
