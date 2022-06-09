import { ReactElement } from 'react'
import useAuth from '../hooks/useAuth'
import { check } from '../util/roles'

type CanProps = {
  perform: string
  yes: () => ReactElement | null
  no: () => ReactElement | null
}

function Can({ perform, yes, no }: CanProps) {
  const auth = useAuth()
  const role = auth.user?.role || ''
  return check(role, perform) ? yes() : no()
}

Can.defaultProps = {
  perform: '',
  yes: () => null,
  no: () => null,
}

export default Can
