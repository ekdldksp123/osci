export interface Post {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
}

export interface CommentType {
  id: number
  postId: number
  userId: number
  content: string
  createdAt: string
}
