import request from 'supertest'

import { OrderDocument } from '../../src/models/Order'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingOrderId = '5e57b77b5744fa0b461c7906'

async function createOrder(override?: Partial<OrderDocument>) {
  let order = {
    total: 150.5,
    status: 'PENDING',
    userId: '6287dba664e931cb46c9d0a0',
    products: ['628a8020ef535926d3cb4786'],
  }

  if (override) {
    order = { ...order, ...override }
  }

  return await request(app).post('/api/v1/orders').send(order)
}

describe('order controller', () => {
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

  it('should create a order', async () => {
    const res = await createOrder()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.total).toBe(150.5)
  })

  it('should not create a order with wrong data', async () => {
    const res = await request(app).post('/api/v1/orders').send({
      status: 'PENDING',
      // These fields should be included
      // total: 150.5,
      // userId: '6287dba664e931cb46c9d0a0',
      // products: ['628a8020ef535926d3cb4786'],
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)

    const orderId = res.body._id
    res = await request(app).get(`/api/v1/orders/${orderId}`)

    expect(res.body._id).toEqual(orderId)
  })

  it('should not get back a non-existing order', async () => {
    const res = await request(app).get(`/api/v1/orders/${nonExistingOrderId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all order', async () => {
    const res1 = await createOrder({
      total: 150.5,
      userId: '6287dba664e931cb46c9d0a0',
      products: ['628a8020ef535926d3cb4786'],
    })
    const res2 = await createOrder({
      total: 150.5,
      userId: '6287dba664e931cb46c9d0a0',
      products: ['628a8020ef535926d3cb4786'],
    })

    const res3 = await request(app).get('/api/v1/orders')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)

    const orderId = res.body._id
    const update = {
      total: 190.3,
      status: 'APPROVED',
      products: ['628a8020ef535926d3cb4786', '789a8020ef535926d3cb4786'],
    }

    res = await request(app).put(`/api/v1/orders/${orderId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.total).toEqual(190.3)
    expect(res.body.status).toEqual('APPROVED')
  })

  it('should delete an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)
    const orderId = res.body._id

    res = await request(app).delete(`/api/v1/orders/${orderId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/orders/${orderId}`)
    expect(res.status).toBe(404)
  })
})
