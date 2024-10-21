import AuthProvider from './context/AuthProvider.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GetAllUsers from "./context/GetAllUsers.jsx"
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <GetAllUsers>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>,
    </GetAllUsers>
  </BrowserRouter>
)
