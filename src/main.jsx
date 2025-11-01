import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Auth0Provider
      domain="rvvshid04.jp.auth0.com"
      clientId="4O9FSFbvL1Fh8aFOMhneL0GLKzBVtIto"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
