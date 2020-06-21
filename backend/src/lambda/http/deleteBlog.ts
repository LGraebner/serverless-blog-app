import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { deleteBlogItem } from '../../businessLogic/blogs'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteBlogs')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('caller event ', { event: event})
  const blogId = event.pathParameters.blogId

  await deleteBlogItem(blogId)

  return {
      statusCode: 204,
      body: ''
  }

})

handler.use(
  cors({
      credentials: true
  })
)
