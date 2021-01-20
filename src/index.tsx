import React from 'react'
import ReactDOM from 'react-dom'

import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import { AppRouter } from './routes'
import * as serviceWorker from './serviceWorker'

import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens)
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <AppRouter />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
