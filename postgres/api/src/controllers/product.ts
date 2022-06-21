import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product'
import { BadRequestError } from '../helpers/apiError'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('body ', req.body)
    const { name, description, price, categories, variants, sizes } = req.body
    // const { _id } = req.user as PartialUser;

    const product = Product.build({
      name,
      description,
      price,
      categories,
      variants,
      sizes,
      // userId: _id,
    } as Product)

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
    const { productId } = req.params
    const updatedProduct = await productService.update(
      parseInt(productId),
      update
    )
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
    const { productId } = req.params
    await productService._delete(parseInt(productId))
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
    const { productId } = req.params
    res.json(await productService.findById(parseInt(productId)))
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
    const results = await productService.findAll()
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
