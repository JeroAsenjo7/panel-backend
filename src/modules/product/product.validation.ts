import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCreatedProduct } from './product.interfaces';

// Body del post
const createProductBody: Record<keyof NewCreatedProduct, any> = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0),
};

export const createProduct = {
  body: Joi.object().keys(createProductBody),
};

// Parametros de URL del listado
export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string().lowercase(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// productID de la URL tenga formato de id Mongo
export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

// id y body del patch para actualizar un producto, exige al menos un campo
export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      category: Joi.string(),
      stock: Joi.number().integer().min(0),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};