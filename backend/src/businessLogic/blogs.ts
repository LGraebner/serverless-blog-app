import { BlogAccess } from '../dataLayer/blogsAccess'
import { BlogItem } from '../models/BlogItem'
import { CreateBlogRequest } from '../requests/CreateBlogRequest'
import { UpdateBlogRequest } from '../requests/UpdateBlogRequest'
import * as AuthUtils from '../auth/utils'

const blogAccess = new BlogAccess()

export async function getAllBlogItems(jwtToken: string): Promise<BlogItem[]> {
    const userId = AuthUtils.parseUserId(jwtToken)
    return await blogAccess.getAllBlogItems(userId)
}

export async function getBlogItem(blogId: string, jwtToken: string): Promise<BlogItem> {
    const userId = AuthUtils.parseUserId(jwtToken)
    return await blogAccess.getBlogItem(blogId, userId)
}

export async function createNewBlogItem(createBlogRequest: CreateBlogRequest, jwtToken: string): Promise<BlogItem> {
    const userId = AuthUtils.parseUserId(jwtToken)
    return await blogAccess.createNewBlogItem(createBlogRequest, userId)
}

export async function updateBlogItem(updateBlogRequest: UpdateBlogRequest, blogId: string, jwtToken: string): Promise<BlogItem> {
    const userId = AuthUtils.parseUserId(jwtToken)
    return await blogAccess.updateBlogItem(updateBlogRequest, blogId, userId)
}

export async function deleteBlogItem(blogId: string, jwtToken: string) {
    const userId = AuthUtils.parseUserId(jwtToken)
    await blogAccess.deleteBlogItem(blogId, userId)
}

export async function generateUploadUrl(blogId: string): Promise<string> {
    return await blogAccess.generateUploadUrl(blogId)
}