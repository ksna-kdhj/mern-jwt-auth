import App from './App'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import './index.css'

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route path='/*' element = {<App/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
)
