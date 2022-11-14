import { FastifyPluginAsync } from 'fastify'
import manufacturersRouter from './manufacturers'
import modelsRouter from './models'

const router: FastifyPluginAsync = async (fastify) => {
  fastify.register(manufacturersRouter)
  fastify.register(modelsRouter)
}

export default router
