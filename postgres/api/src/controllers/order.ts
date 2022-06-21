import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import orderService from '../services/order'
import { BadRequestError } from '../helpers/apiError'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('body ', req.body)
    const { total, paymentStatus, products } = req.body
    const { userId } = req.body
    // const { _id } = req.user as PartialUser

    const order = Order.build({
      total,
      paymentStatus,
      userId,
      // products,
    } as Order)

    // TODO: Add products to Order instance
    // order.addProducts()

    await orderService.create(order)
    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body
    const { orderId } = req.params
    const updatedOrder = await orderService.update(parseInt(orderId), update)
    res.json(updatedOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const _delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params
    await orderService._delete(parseInt(orderId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params
    res.json(await orderService.findById(parseInt(orderId)))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await orderService.findAll()
    res.json(results)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export default {
  create,
  update,
  _delete,
  findById,
  findAll,
}
