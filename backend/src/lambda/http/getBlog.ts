import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { getBlogItem } from '../../businessLogic/blogs'
import * as AuthUtils from '../../auth/utils'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getBlog')

export const handler= middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('caller event ', { event: event})
  const blogId = event.pathParameters.blogId
  const token: string = AuthUtils.getTokenFromApiGatewayEvent(event)
  const item  = await getBlogItem(blogId, token)

  if (item !== null) {
    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }
  }
  else {
    return {
        statusCode: 404,
        body: ''
    }
  }

})

handler.use(
    cors({
        credentials: true
    })
)