import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product'
import { BadRequestError } from '../helpers/apiError'
import { ProductsFindAllFilter, ProductsSortOrder } from 'product'

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
    res.status(204).json({ message: `Product ${req.params.productId} deleted` })
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
    res.json(await productService.findById(req.params.productId))
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
    const { name, categories, variants } = req.query
    const filter: ProductsFindAllFilter = {}
    if (name) filter.name = { $regex: name }
    if (categories) filter.categories = categories as string
    if (variants) filter.variants = variants as string
    const { sort, ascDesc } = req.query
    const _sort: ProductsSortOrder = {}
    if (sort) {
      const _ascDesc: number = ascDesc && ascDesc === 'desc' ? -1 : 1
      _sort[sort as string] = _ascDesc
    }
    const { limit, offset } = req.query
    const _limit: number = limit ? parseInt(limit as string) : 0
    const _offset: number = offset && limit ? parseInt(limit as string) : 0
    res.json(await productService.findAll(filter, _sort, _limit, _offset))
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
