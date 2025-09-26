import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthenticateRoutes from './utils/AuthenticateRoutes.jsx'
import UnAuthenticateRoutes from './utils/UnAuthenticateRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<UnAuthenticateRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>
      
        <Route element={<AuthenticateRoutes />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
