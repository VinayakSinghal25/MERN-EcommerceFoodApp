import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {CartProvider} from './context/cart-context.jsx'
import { LoginProvider } from './context/login-context.jsx';
import { Provider } from 'react-redux';
import store from './store/store.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

        <CartProvider>

          <LoginProvider>

          <App />
          
          </LoginProvider>
          
        </CartProvider>

      </Provider>

    </BrowserRouter>
    
  </React.StrictMode>,
)
