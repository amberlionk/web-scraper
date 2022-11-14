import { FastifyPluginAsync} from 'fastify'
import swagger from '@fastify/swagger'
import openAPISettings from "./openapi"
import api from "./routes"
import storageDecorator,{IStorage} from "./decorators/storage"

declare module 'fastify' {
  interface FastifyInstance {
    storage: IStorage
  }
}

const router: FastifyPluginAsync = async (fastify) => {
  fastify.register(storageDecorator)  
  fastify.register(swagger, openAPISettings)
  fastify.register(api)

}

export default router
