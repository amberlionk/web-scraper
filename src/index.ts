
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import api from "./api/routes"
import openAPISettings from "./api/openapi"
import {initScrapers} from "./entities/scraper-factory"
import Storage from "./drivers/storage"


const PORT=Number(process.env.PORT) || 8080


const fastify = Fastify({
  logger: true
})
fastify.register(swagger, openAPISettings)
fastify.register(api)


const start = async () => {
  try {
    await Storage.connect()
    await initScrapers()


    await fastify.listen({ port: PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
