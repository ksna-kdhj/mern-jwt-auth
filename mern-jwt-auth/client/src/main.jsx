import App from './App'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import './index.css'
import {store} from './app/store'
import { Provider } from 'react-redux'

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
        <Route path='/*' element = {<App/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
)
