const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Credenciales incorrectas')
  return data.token
}

export async function computeQR(matrix, token) {
  const response = await fetch(`${API_URL}/qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ matrix }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Error inesperado en el servidor')
  return data
}
