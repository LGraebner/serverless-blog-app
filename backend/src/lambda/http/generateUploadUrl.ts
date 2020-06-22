import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { generateUploadUrl } from '../../businessLogic/blogs'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateUploadUrls')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('caller event ', { event: event})

  const blogId = event.pathParameters.blogId
  const uploadUrl =  await generateUploadUrl(blogId)

  return {
    statusCode: 200,
    body: JSON.stringify({
        uploadUrl: uploadUrl
    })
  }
})

handler.use(
  cors({
      credentials: true
  })
)
