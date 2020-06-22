import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { deleteBlogItem } from '../../businessLogic/blogs'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import * as AuthUtils from '../../auth/utils'

const logger = createLogger('deleteBlogs')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('caller event ', { event: event})
  const blogId = event.pathParameters.blogId
  const token: string = AuthUtils.getTokenFromApiGatewayEvent(event)
  await deleteBlogItem(blogId, token)

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
