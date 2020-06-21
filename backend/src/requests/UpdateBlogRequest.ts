/**
 * Fields in a request to update a single Blog item.
 */
export interface UpdateBlogRequest {
  title: string
  previewText: string
  articleText: string
  articleImageUrl: string
}