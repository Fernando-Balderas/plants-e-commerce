import { User } from '../../types/types'

const mock = [
  { _id: 'A0001', name: 'User 1', lastname: 'Lastname', status: 'ACTIVE' },
  { _id: 'A0002', name: 'User 2', lastname: 'Lastname', status: 'ACTIVE' },
  { _id: 'A0003', name: 'User 3', lastname: 'Lastname', status: 'BANNED' },
] as User[]

// A mock function to mimic making an async request for data
export function fetchUsers(amount = mock) {
  return new Promise<{ data: User[] }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
}
