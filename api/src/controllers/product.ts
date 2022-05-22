import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product'
import { BadRequestError } from '../helpers/apiError'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, categories, variants, sizes } = req.body

    const product = new Product({
      name,
      description,
      price,
      categories,
      variants,
      sizes,
    })

    await productService.create(product)
    res.json(product)
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
    const productId = req.params.productId
    const updatedProduct = await productService.update(productId, update)
    res.json(updatedProduct)
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
    await productService._delete(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /movies/:productId
const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /movies
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findAll())
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
