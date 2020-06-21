import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BlogItem } from '../models/BlogItem'
import { CreateBlogRequest } from '../requests/CreateBlogRequest'
import { UpdateBlogRequest } from '../requests/UpdateBlogRequest'
import { v4 as uuid } from 'uuid'
import * as Utils from '../lambda/utils'
import { createLogger } from '../utils/logger'
import * as winston from 'winston'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

//Workaround for Document client, see https://github.com/aws/aws-xray-sdk-node/issues/23
const docClient1:DocumentClient = new DocumentClient()
AWSXRay.captureAWSClient(((docClient1) as any).service)

export class BlogAccess {

    constructor(
        private readonly docClient: DocumentClient = docClient1,
        private readonly s3 = new XAWS.S3({
            signatureVersion: 'v4'
          }),
        private readonly logger: winston.Logger = createLogger('BlogAccess'),
        private readonly tableName = process.env.BLOG_TABLE,
        private readonly bucketName = process.env.BLOG_S3_BUCKET,
        private readonly urlExpiration = parseInt (process.env.SIGNED_URL_EXPIRATION, 10)) { 
    }

    async getAllBlogItems(): Promise<BlogItem[]> {
        this.logger.info('Getting all blog items')

        const result = await this.docClient.scan({
            TableName: this.tableName,
          }).promise()
        
          let items
          if (result.Count !== 0) {
            items = result.Items
          } else {
            items = []
          }

        return items as BlogItem[]
    }

    async getBlogItem(blogId: string): Promise<BlogItem> {
        this.logger.info('Get  blog item', {blogId: blogId})

        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: 'blogId = :blogId',
            ExpressionAttributeValues: {
                ':blogId': blogId
            }
          }).promise()
        
          if (result.Count !== 0) {
              return result.Items[0] as BlogItem
          } else {
              return null
          }
    }

    async createNewBlogItem(newBlog: CreateBlogRequest): Promise<BlogItem> {
        this.logger.info(`Creating new blog item ${newBlog}`)

        const itemId = uuid()
        const newItem = {
          blogId: itemId,
          createdAt: new Date().toISOString(),
          attachmentUrl: `https://${this.bucketName}.s3.amazonaws.com/${itemId}`,
          done: false,
          ...newBlog
        }
      
        this.logger.info('new Item ', { newItem: newItem})
      
        await this.docClient.put({
          TableName: this.tableName,
          Item: newItem
        }).promise()

        return Utils.createBlogItemDto(newItem)
    }

    async deleteBlogItem(blogId : string) {
        this.logger.info(`Deleting blog item ${blogId}`)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: 'blogId = :blogId',
            ExpressionAttributeValues: {
                ':blogId': blogId
            }
          }).promise()
        
        if (result.Count !== 0) {
            const item = result.Items[0]
        
            await this.docClient.delete({
                TableName: this.tableName,
                Key: {
                    blogId: item.blogId,
                    createdAt: item.createdAt
                }
            }).promise()
    
        }
    }

    async updateBlogItem(updatedBlog : UpdateBlogRequest, blogId: string): Promise<BlogItem> {
        this.logger.info(`Updating blog item with ${updatedBlog}`)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: 'blogId = :blogId',
            ExpressionAttributeValues: {
                ':blogId': blogId
            }
          }).promise()
        

        if (result.Count !== 0) {
            const item = result.Items[0]
            const updatedItem = {
                ...item,
                ...updatedBlog
            }
         
            await this.docClient.put({
                TableName: this.tableName,
                Item: updatedItem
            }).promise()

            return Utils.createBlogItemDto(updatedItem)
        } else {
            return null
        }
    }

    async generateUploadUrl(blogId : string): Promise<string> {
        this.logger.info(`Generating uploadUrl for blog item ${blogId}`)
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: blogId,
            Expires: this.urlExpiration
          })
    }

}