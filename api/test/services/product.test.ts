import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import connect, { MongodHelper } from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct() {
  const product = new Product({
    name: 'Product',
    description: 'Description',
    price: 10.1,
    categories: ['category 1'],
    variants: ['variant 1'],
    sizes: ['size 1'],
  })
  return await ProductService.create(product)
}

describe('product service', () => {
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

  it('should create a product', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Product')
    expect(product).toHaveProperty('price', 10.1)
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found._id).toEqual(product._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing product', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should update an existing product', async () => {
    const product = await createProduct()
    const update = {
      name: 'Product C00258',
      description: 'Description',
      price: 10.5,
      categories: ['category 1', 'category 2'],
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'Product C00258')
    expect(updated).toHaveProperty('price', 10.5)
  })

  it('should not update a non-existing product', async () => {
    expect.assertions(1)
    const update = {
      name: 'Product C00258',
      description: 'Description',
      price: 10.5,
      categories: ['category 1', 'category 2'],
    }

    return ProductService.update(nonExistingProductId, update).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService._delete(product._id)
    return ProductService.findById(product._id).catch((e) => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })
})
