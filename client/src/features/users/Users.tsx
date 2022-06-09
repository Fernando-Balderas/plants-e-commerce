import React, { useEffect } from 'react'
import { useStoreDispatch, useStoreSelector } from '../../store/hooks'
import { User } from '../../types/types'
import { loadUsers, selectUsers, updateUserStatus } from './usersSlice'

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
            <p>{`${user.name} - ${user.lastname}`}</p>
            <button onClick={() => handleUpdateStatus(user)}>
              {banMessage(user.status)}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Users
