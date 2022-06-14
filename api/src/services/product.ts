import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'
import { ProductsFindAllFilter, ProductsSortOrder } from 'product'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const findAll = async (
  filter: ProductsFindAllFilter,
  sort: ProductsSortOrder,
  limit: number,
  offset: number
): Promise<ProductDocument[]> => {
  return Product.find(filter).sort(sort).skip(offset).limit(limit)
}

const findUserProducts = async (userId: string): Promise<ProductDocument[]> => {
  return Product.find({ userId }).sort({ createdAt: -1 })
}

const update = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const _delete = async (productId: string): Promise<ProductDocument | null> => {
  const foundProduct = Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const loadDataset = async (
  products: ProductDocument[]
): Promise<ProductDocument[]> => {
  return Product.create(products)
}

export default {
  create,
  findById,
  findAll,
  findUserProducts,
  update,
  _delete,
  loadDataset,
}
