import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundProduct = await Order.findById(orderId)

  if (!foundProduct) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundProduct = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundProduct
}

const _delete = async (orderId: string): Promise<OrderDocument | null> => {
  const foundProduct = Order.findByIdAndDelete(orderId)

  if (!foundProduct) {
    throw new NotFoundError(`Order ${orderId} not found`)
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
