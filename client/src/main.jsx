import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/UserProvider.jsx'
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>,
)
