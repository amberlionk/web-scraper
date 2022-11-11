import { FromSchema } from 'json-schema-to-ts'
import  {FastifyInstance} from 'fastify'

export default async (fastify: FastifyInstance) => {
  const getManufacturersSchema = {
    response: {
      200: {
        type: 'object',
        required: [],
        properties: {
          hello: { type: 'string' },
        }
      }    
    }
  } as const 
  fastify.get('/manufacturers', { schema: getManufacturersSchema },function (req, resp) {
    resp.send({ hello: 'world' })
  })
  
  const getModelsSchema = {
    response: {
      200: {
        type: 'object',
        required: [],
        properties: {
          hello: { type: 'string' },
        }
      }    
    }
  } as const 
  fastify.get<{
    // Reply: FromSchema<typeof getModelsSchema.response[200]>
  }>('/models',{ schema: getModelsSchema }, function (req, resp) {
    resp.send({ hello: 'world' })
  })
  
  
  const getSpecModelSchema = {
    // description: 'post some data',
    // tags: ['user', 'code'] as string[],
    // summary: 'qwerty',
    params: {
      type: 'object',
      required: ['modelId'],
      properties: {
        modelId: { type: 'string' },
      }
    },
    response: {
      200: {
        type: 'object',
        required: [],
        properties: {
          hello: { type: 'string' },
          xxx: { type: 'string' },
        }
      }    
    }
  } as const 
  fastify.get<{
    Params: FromSchema<typeof getSpecModelSchema.params>,
    Reply: FromSchema<typeof getSpecModelSchema.response[200]>
  }>('/spec/:modelId', { schema: getSpecModelSchema },function (req, resp) {
    
    const {modelId} = req.params
    
  
    resp.send({ 
      hello: 'world',
      xxx: modelId
   })
  })
}
