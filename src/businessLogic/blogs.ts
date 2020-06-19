import { BlogAccess } from '../dataLayer/blogsAccess'
import { BlogItem } from '../models/BlogItem'
import { CreateBlogRequest } from '../requests/CreateBlogRequest'
import { UpdateBlogRequest } from '../requests/UpdateBlogRequest'

const blogAccess = new BlogAccess()

export async function getAllBlogItems(): Promise<BlogItem[]> {
    return await blogAccess.getAllBlogItems()
}

export async function createNewBlogItem(createBlogRequest: CreateBlogRequest): Promise<BlogItem> {
    return await blogAccess.createNewBlogItem(createBlogRequest)
}

export async function updateBlogItem(updateBlogRequest: UpdateBlogRequest, blogId: string): Promise<BlogItem> {
    return await blogAccess.updateBlogItem(updateBlogRequest, blogId)
}

export async function deleteBlogItem(blogId: string) {
    await blogAccess.deleteBlogItem(blogId)
}

export async function generateUploadUrl(blogId: string): Promise<string> {
    return await blogAccess.generateUploadUrl(blogId)
}