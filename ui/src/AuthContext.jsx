import { createContext, useContext, useState, useEffect } from 'react'

const API_BASE_URL = process.env.REACT_APP_PROJECT_API_URL

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(API_BASE_URL + '/check_auth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setUser(data.user)
      })
  }, [])

  const login = async (username, password) => {
    const res = await fetch(API_BASE_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
      return true
    } else {
      alert(data.error)
      return false
    }
  }

  const logout = async () => {
    await fetch(API_BASE_URL + '/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
