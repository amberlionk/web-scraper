import { FromSchema } from 'json-schema-to-ts'
import { FastifyPluginAsync } from 'fastify'
import {getManufactures} from "./../../../interactors/manufacturer"


const router: FastifyPluginAsync = async (fastify) => {
  const getManufacturersSchema = {
    response: {
      200: {
        type: "array",
        items:{
          type: 'object',
          required: ["_id", "title", "url"],
          additionalProperties: false,
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            url: { type: 'string' }
          }
        }
      }
    }
  } as const
  fastify.get<{
    Reply: FromSchema<typeof getManufacturersSchema.response[200]>
  }>('/manufacturers', { schema: getManufacturersSchema }, async (req, resp) => {
    const manufacturers =await  getManufactures(fastify.storage)
    
    resp.send(manufacturers)
  })
}
export default router
