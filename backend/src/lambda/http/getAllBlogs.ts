import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { getAllBlogItems } from '../../businessLogic/blogs'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getAllBlogs')

export const handler= middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('caller event ', { event: event})

  const items  = await getAllBlogItems()

  return {
      statusCode: 200,
      body: JSON.stringify({
          items: items
      })
  }

})

handler.use(
    cors({
        credentials: true
    })
)