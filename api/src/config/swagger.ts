import swaggerJsdoc from 'swagger-jsdoc'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routers/*.ts'], // files containing annotations
}
export default swaggerJsdoc(options)
