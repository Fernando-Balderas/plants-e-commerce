import Order from '../models/Order'
import { NotFoundError } from '../helpers/apiError'
import Product from '../models/Product'

const create = async (order: Order): Promise<Order> => {
  return order.save()
}

const findAll = async (): Promise<Order[]> => {
  return Order.findAll({ include: [Product] })
}

const findById = async (orderId: number): Promise<Order> => {
  const foundOrder = await Order.findByPk(orderId, { include: [Product] })

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const update = async (
  orderId: number,
  update: Partial<Order>
): Promise<Order | null> => {
  const [count, foundOrder] = await Order.update(update, {
    where: {
      id: orderId,
    },
    returning: true,
  })

  if (!count) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder[0]
}

const _delete = async (orderId: number): Promise<number> => {
  const count = Order.destroy({
    where: {
      id: orderId,
    },
  })

  if (!count) {
    throw new NotFoundError(`Order ${orderId} not found`)
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
