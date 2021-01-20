import React from 'react'
import { useKeycloak } from '@react-keycloak/web'
import TokenLifetime from 'components/TokenLifetime'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
const Home: React.FC = () => {
  const { keycloak } = useKeycloak()
  const tokenParsed: any = keycloak?.tokenParsed

  if (!tokenParsed) return null

  const username = tokenParsed?.preferred_username

  if (!username) return null

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        Hello,&nbsp;
        <strong>{username}</strong>
      </Grid>
      <Grid item xs={12}>
        <TokenLifetime />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => keycloak.logout()}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  )
}

export default Home
