/**
 * Fields in a request to create a single Blog item.
 */
export interface CreateBlogRequest {
  title: string
  previewText: string
  articleText: string
  articleImageUrl: string
}
