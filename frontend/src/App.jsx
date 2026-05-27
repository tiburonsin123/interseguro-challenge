import { useState } from 'react'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import MatrixInput from './components/MatrixInput/MatrixInput'
import MatrixDisplay from './components/MatrixDisplay/MatrixDisplay'
import StatisticsPanel from './components/StatisticsPanel/StatisticsPanel'
import ErrorAlert from './components/ErrorAlert/ErrorAlert'
import { computeQR } from './services/api'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setResult(null)
    setError('')
  }

  const handleSubmit = async (matrix) => {
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const data = await computeQR(matrix, token)
      setResult(data)
    } catch (err) {
      // Si el token expiró, fuerza logout
      if (err.message.includes('token') || err.message.includes('401')) {
        handleLogout()
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLogout={handleLogout} />
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <MatrixInput onSubmit={handleSubmit} loading={loading} />

        {error && <ErrorAlert message={error} />}

        {result && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MatrixDisplay
                title="Matriz Original"
                subtitle="A"
                matrix={result.original_matrix}
                accent="border-slate-300"
                labelColor="text-slate-500"
              />
              <MatrixDisplay
                title="Matriz Q"
                subtitle="Ortogonal"
                matrix={result.Q}
                accent="border-blue-500"
                labelColor="text-blue-500"
              />
              <MatrixDisplay
                title="Matriz R"
                subtitle="Triangular Superior"
                matrix={result.R}
                accent="border-emerald-500"
                labelColor="text-emerald-500"
              />
            </div>
            <StatisticsPanel statistics={result.statistics} />
          </>
        )}
      </main>
    </div>
  )
}
