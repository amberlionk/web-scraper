
import Fastify from 'fastify'
import storage from "./drivers/storage"
import api from "./api"
import {initScrapers} from "./entities/scraper-factory"
import {seedDB} from "./interactors/seed-db"

const PORT=Number(process.env.PORT) || 8080

const fastify = Fastify({
  logger: true
})
fastify.register(api)

const start = async () => {
  try {
    await storage.connect()
    await initScrapers()
    await seedDB(storage)

    await fastify.listen({ port: PORT, host:"0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
