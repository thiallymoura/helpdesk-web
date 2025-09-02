import { AuthProvider } from "./contexts/AuthContext"

import { Routes } from './routes'

export function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}




