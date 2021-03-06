import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId)
    .populate('userId')
    .populate('products')
    .exec()

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().sort({ createdAt: -1 })
}

const findUserOrders = async (userId: string): Promise<OrderDocument[]> => {
  return Order.find({ userId }).sort({ createdAt: -1 })
}

const update = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const _delete = async (orderId: string): Promise<OrderDocument | null> => {
  const foundOrder = Order.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

export default {
  create,
  findById,
  findAll,
  findUserOrders,
  update,
  _delete,
}
