import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    name: 'Alex',
    lastname: 'Doe',
    email: 'alex.doe@mail.com',
    password: '6287dba664e931cb46c9d0a0',
    role: 'ADMIN',
  }

  if (override) {
    user = { ...user, ...override }
  }

  return await request(app).post('/api/v1/users/signup').send(user)
}

describe('user controller', () => {
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
    const res = await createUser()
    // console.log('res ', res)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Alex')
  })

  it('should not create a user with wrong data', async () => {
    const res = await request(app).post('/api/v1/users/signup').send({
      name: 'Alex',
      lastname: 'Doe',
      // These fields should be included
      // email: 'alex.doe@mail.com',
      // password: '6287dba664e931cb46c9d0a0',
      role: 'ADMIN',
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    res = await request(app).get(`/api/v1/users/${userId}`)

    expect(res.body._id).toEqual(userId)
  })

  it('should not get back a non-existing user', async () => {
    const res = await request(app).get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all user', async () => {
    const res1 = await createUser({
      name: 'User 1',
      email: 'user.1@mail.com',
      password: '6287dba664e931cb46c9d0a0',
    })
    const res2 = await createUser({
      name: 'User 2',
      email: 'user.2@mail.com',
      password: '6287dba664e931cb46c9d0a0',
    })

    const res3 = await request(app).get('/api/v1/users')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      name: 'Alexander',
      lastname: 'Doroti',
    }

    res = await request(app).put(`/api/v1/users/${userId}/profile`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Alexander')
    expect(res.body.lastname).toEqual('Doroti')
  })

  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app).delete(`/api/v1/users/${userId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(404)
  })
})
