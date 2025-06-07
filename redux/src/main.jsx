import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(
  // here now provide the access of the store to whole app component
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
