import React from 'react'
import { useCallback } from 'react'
import { Redirect, useLocation } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import Button from '@material-ui/core/Button'

const LoginPage: React.FC = () => {
  const location = useLocation<{ [key: string]: unknown }>()
  const currentLocationState = location.state || {
    from: { pathname: '/home' },
  }

  const { keycloak } = useKeycloak()

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  if (keycloak?.authenticated) {
    return <Redirect to={currentLocationState?.from as string} />
  }

  return (
    <>
      <h3>Hello. Please log in.</h3>
      <Button variant="contained" color="primary" onClick={login}>
        Login
      </Button>
    </>
  )
}

export default LoginPage
