import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findById = async (movieId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(movieId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${movieId} not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  movieId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(movieId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${movieId} not found`)
  }

  return foundProduct
}

const _delete = async (movieId: string): Promise<ProductDocument | null> => {
  const foundProduct = Product.findByIdAndDelete(movieId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${movieId} not found`)
  }

  return foundProduct
}

export default {
  create,
  findById,
  findAll,
  update,
  _delete,
}
