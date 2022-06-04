import User from '../../src/models/User'
import UserService from '../../src/services/user'
import connect, { MongodHelper } from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser() {
  const user = new User({
    name: 'Alex',
    lastname: 'Doe',
    email: 'alex.doe@mail.com',
    password: '6287dba664e931cb46c9d0a0',
    role: 'ADMIN',
  })
  return await UserService.create(user)
}

describe('user service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('name', 'Alex')
    expect(user).toHaveProperty('email', 'alex.doe@mail.com')
  })

  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findById(user._id)
    expect(found.name).toEqual(user.name)
    expect(found._id).toEqual(user._id)
  })

  it('should get a user with email', async () => {
    const user = await createUser()
    const found = await UserService.findByEmail(user.email)
    expect(found.name).toEqual(user.name)
    expect(found._id).toEqual(user._id)
  })

  it('should get a user with email without throwing error', async () => {
    const user = await createUser()
    const found = await UserService.findByEmailOrNull(user.email)
    expect(found?.name).toEqual(user.name)
    expect(found?._id).toEqual(user._id)
  })

  it('should get a user with email and password', async () => {
    const user = await createUser()
    const found = await UserService.findByEmailAndPassword(
      user.email,
      user.password as string
    )
    expect(found.name).toEqual(user.name)
    expect(found._id).toEqual(user._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return UserService.findById(nonExistingUserId).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      name: 'Alexander',
      lastname: 'Doroti',
    }
    const updated = await UserService.update(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('name', 'Alexander')
    expect(updated).toHaveProperty('lastname', 'Doroti')
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      name: 'Shrek',
      lastname: '',
    }

    return UserService.update(nonExistingUserId, update).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService._delete(user._id)
    return UserService.findById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })
})
