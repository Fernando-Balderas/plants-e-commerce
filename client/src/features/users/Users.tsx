import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'

import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { loadUsers, selectUsers, updateUserStatus } from './usersSlice'
import { User } from '../../types/types'

function Users() {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  const users = useStoreSelector(selectUsers)
  const banMessage = (status: string) => (status === 'ACTIVE' ? 'BAN' : 'UNBAN')
  const handleUpdateStatus = (user: User) => {
    const update = user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE'
    dispatch(updateUserStatus({ id: user._id, status: update }))
  }

  return (
    <ul>
      {users.length > 0 &&
        users.map((user) => (
          <li key={user._id}>
            <p>{`${user.name} ${user.lastname} - ${user.email}`}</p>
            <Button
              variant="outline-danger"
              className="mx-1"
              aria-label="Remove product"
              onClick={() => handleUpdateStatus(user)}
            >
              {banMessage(user.status)}
            </Button>
          </li>
        ))}
    </ul>
  )
}

export default Users
