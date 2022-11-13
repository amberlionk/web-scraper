import { FromSchema } from 'json-schema-to-ts'
import { FastifyInstance } from 'fastify'
import { getModelSpec, getModels } from "../../../interactors/model"


export default async (fastify: FastifyInstance) => {
  const getModelsSchema = {
    response: {
      200: {
        type: "array",
        items:{
          type: 'object',
          required: ["_id", "title", "url", "manufacturer"],
          additionalProperties: false,
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            manufacturer: { enum:  ["asus", "samsung"] },
            url: { type: 'string' }
          }
        }
      }
    }
  } as const
  fastify.get<{
    Reply: FromSchema<typeof getModelsSchema.response[200]>
  }>('/models', { schema: getModelsSchema }, async function (req, resp) {
    const models =await  getModels()

    resp.send(models)
  })


  const getSpecModelSchema = {
    // description: 'post some data',
    // tags: ['user', 'code'] as string[],
    // summary: 'qwerty',
    params: {
      type: 'object',
      required: ['modelID'],
      properties: {
        modelID: { type: 'string' },
      }
    },
    response: {
      200: {
        type: 'object',
        "patternProperties": {
          "^.*$": { "type": "string" }
        }
      }
    }
  } as const
  fastify.get<{
    Params: FromSchema<typeof getSpecModelSchema.params>,
    Reply: FromSchema<typeof getSpecModelSchema.response[200]>
  }>('/models/:modelID/spec', { schema: getSpecModelSchema }, async function (req, resp) {
    const { modelID } = req.params
    const productSpec = await getModelSpec(modelID)

    resp.send(productSpec)
  })
}
