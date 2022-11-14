import { FastifyPluginAsync} from 'fastify'
import fp from 'fastify-plugin'
import storage from "./../../drivers/storage"

const storageDecorator: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorate('storage', storage) 
}

export type IStorage = typeof storage
export default fp(storageDecorator, { name: 'storage' })
