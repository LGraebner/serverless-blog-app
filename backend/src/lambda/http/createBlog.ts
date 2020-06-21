import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { CreateBlogRequest } from '../../requests/CreateBlogRequest'
import { createNewBlogItem } from '../../businessLogic/blogs'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'


const logger = createLogger('createBlog')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('caller event ', { event: event})

  const newBlog: CreateBlogRequest = JSON.parse(event.body)
  const item = await createNewBlogItem(newBlog)

  return {
    statusCode: 201,
    body: JSON.stringify({
        item: item
    })
  }
})

handler.use(
  cors({
      credentials: true
  })
)
