import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { UpdateBlogRequest } from '../../requests/UpdateBlogRequest'
import { updateBlogItem } from '../../businessLogic/blogs'
import { BlogItem } from '../../models/BlogItem'
import *  as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateBlog')

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Caller event: ', event)

  const blogId = event.pathParameters.blogId
  const updatedBlog: UpdateBlogRequest = JSON.parse(event.body)

  const updatedItem: BlogItem = await updateBlogItem(updatedBlog, blogId)

  if (updatedItem !== null) {
    return {
        statusCode: 200,
        body: JSON.stringify(updatedItem)
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
