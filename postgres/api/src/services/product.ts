import Product from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: Product): Promise<Product> => {
  return product.save()
}

const findById = async (productId: number): Promise<Product> => {
  const foundProduct = await Product.findByPk(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<Product[]> => {
  return Product.findAll({
    paranoid: false,
  })
}

const update = async (
  productId: number,
  update: Partial<Product>
): Promise<Product | null> => {
  const [count, foundProduct] = await Product.update(update, {
    where: {
      id: productId,
    },
    returning: true,
  })

  if (!count) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct[0]
}

const _delete = async (productId: number): Promise<number> => {
  const count = Product.destroy({
    where: {
      id: productId,
    },
  })

  if (!count) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return count
}

export default {
  create,
  findById,
  findAll,
  update,
  _delete,
}
