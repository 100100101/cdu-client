import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import 'fontsource-roboto'

import HomePage from 'pages/Home'
import LoginPage from 'pages/Login'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { PrivateRoute } from './utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
)

export const AppRouter = () => {
  const { initialized } = useKeycloak()
  const classes = useStyles()

  let content = null
  if (!initialized) {
    content = <span>Establishing a connection to the server...</span>
  } else {
    content = (
      <Router>
        <Redirect from="/" to="/home" />
        <PrivateRoute path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    )
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.paper}>{content}</Paper>
    </Grid>
  )
}
