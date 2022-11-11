
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import api from "./api/routes"
import openAPISettings from "./api/openapi"


const PORT=Number(process.env.PORT) || 8080


const fastify = Fastify({
  logger: true
})

fastify.register(swagger, openAPISettings)
fastify.register(api)


const start = async () => {
  try {
    await fastify.listen({ port: PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
