import React, { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import TextField from '@material-ui/core/TextField'

import {
  ROLE_SCOPE_WRITE,
  ROLE_SCOPE_READ,
  MS_IN_SECOND,
} from 'constants/index'
import { msToHoursMinutesSeconds } from 'utils/time'

const TokenLifetime: React.FC = () => {
  const { keycloak } = useKeycloak()

  const [timerValue, setTimerValue] = useState('')

  const tokenExp = keycloak?.tokenParsed?.exp

  useEffect(() => {
    if (typeof tokenExp !== 'number') return
    let diffTime = tokenExp * 1000 - Date.now()
    if (diffTime < 0) return
    const interval = setInterval(() => {
      diffTime = diffTime - MS_IN_SECOND
      setTimerValue(msToHoursMinutesSeconds(diffTime))
    }, MS_IN_SECOND)

    return () => {
      clearTimeout(interval)
    }
  }, [tokenExp])

  const roles = keycloak?.tokenParsed?.realm_access?.roles
  const isWriteAccess = roles?.includes(ROLE_SCOPE_WRITE)
  const isReadAccess = roles?.includes(ROLE_SCOPE_READ)

  if (!isWriteAccess && !isReadAccess) {
    return <div>No read or write permission</div>
  }

  return (
    <TextField
      id="standard-read-only-input"
      label="Token lifetime"
      value={timerValue}
      InputProps={{
        readOnly: true,
        style: {
          color: isWriteAccess ? 'red' : isReadAccess ? 'green' : '',
        },
      }}
    />
  )
}

export default TokenLifetime
