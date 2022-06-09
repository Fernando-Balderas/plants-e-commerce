import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import orderService from '../services/order'
import { BadRequestError } from '../helpers/apiError'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, paymentStatus, userId, products } = req.body

    const order = new Order({
      total,
      paymentStatus,
      userId,
      products,
    })

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
    const orderId = req.params.orderId
    const updatedOrder = await orderService.update(orderId, update)
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
    await orderService._delete(orderId)
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
    res.json(await orderService.findById(req.params.orderId))
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

const findUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const results = await orderService.findUserOrders(userId)
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
  findUserOrders,
}
