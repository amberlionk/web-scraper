import { FromSchema } from 'json-schema-to-ts'
import { FastifyInstance } from 'fastify'
import {getManufactures} from "./../../../interactors/manufacturer"


export default async (fastify: FastifyInstance) => {
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
  }>('/manufacturers', { schema: getManufacturersSchema }, async function (req, resp) {
    const manufacturers =await  getManufactures()
    
    resp.send(manufacturers)
  })
}
