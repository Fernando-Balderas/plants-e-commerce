import Order from '../../src/models/Order'
import User from '../../src/models/User'
import Product from '../../src/models/Product'
import OrderService from '../../src/services/order'
import UserService from '../../src/services/user'
import ProductService from '../../src/services/product'
import connect, { MongodHelper } from '../db-helper'
import { PaymentStatus } from '../../src/types/order'

// const mockingoose = require('mockingoose')

const nonExistingOrderId = '5e57b77b5744fa0b461c7906'

async function createOrder() {
  const order = new Order({
    total: 150.5,
    status: 'PENDING',
    userId: '6287dba664e931cb46c9d0a0',
    products: ['628a8020ef535926d3cb4786'],
  })
  return await OrderService.create(order)
}

async function createUser() {
  const user = new User({
    _id: '6287dba664e931cb46c9d0a0',
    name: 'Alex',
    lastname: 'Doe',
    email: 'alex.doe@mail.com',
    password: '6287dba664e931cb46c9d0a0',
    role: 'ADMIN',
  })
  return await UserService.create(user)
}

async function createProduct() {
  const product = new Product({
    _id: '628a8020ef535926d3cb4786',
    name: 'Product',
    description: 'Description',
    price: 10.1,
    categories: ['category 1'],
    variants: ['variant 1'],
    sizes: ['size 1'],
  })
  return await ProductService.create(product)
}

describe('order service', () => {
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
    const order = await createOrder()
    expect(order).toHaveProperty('_id')
    expect(order).toHaveProperty('total', 150.5)
    expect(order).toHaveProperty('status', 'PENDING')
  })

  it('should get a order with id', async () => {
    const user = await createUser()
    const product = await createProduct()
    const order = await createOrder()
    const found = await OrderService.findById(order._id)
    expect(found.status).toEqual(order.status)
    expect(found._id).toEqual(order._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing order', async () => {
    expect.assertions(1)
    return OrderService.findById(nonExistingOrderId).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })

  it('should update an existing order', async () => {
    const order = await createOrder()
    const update = {
      total: 190.3,
      status: 'APPROVED' as PaymentStatus,
      products: ['628a8020ef535926d3cb4786', '789a8020ef535926d3cb4786'],
    }
    const updated = await OrderService.update(order._id, update)
    expect(updated).toHaveProperty('_id', order._id)
    expect(updated).toHaveProperty('status', 'APPROVED')
    expect(updated).toHaveProperty('total', 190.3)
  })

  it('should not update a non-existing order', async () => {
    expect.assertions(1)
    const update = {
      total: 190.3,
      status: 'APPROVED' as PaymentStatus,
      products: ['628a8020ef535926d3cb4786', '789a8020ef535926d3cb4786'],
    }

    return OrderService.update(nonExistingOrderId, update).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })

  it('should delete an existing order', async () => {
    expect.assertions(1)
    const order = await createOrder()
    await OrderService._delete(order._id)
    return OrderService.findById(order._id).catch((e) => {
      expect(e.message).toBe(`Order ${order._id} not found`)
    })
  })
})
