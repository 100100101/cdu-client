import Keycloak from 'keycloak-js'

const {
  REACT_APP_KEYCLOAK_URL: url,
  REACT_APP_KEYCLOAK_REALM: realm,
  REACT_APP_KEYCLOAK_CLIENT_ID: clientId,
} = process.env

if (!url || !realm || !clientId) {
  throw new Error('Invalid process.env credentials')
}

const keycloak = Keycloak({
  url,
  realm,
  clientId,
})

export default keycloak
