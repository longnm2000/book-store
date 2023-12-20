export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  avatar?: string;
}

export interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Book {
  id: number;
  avatar: string;
  title: string;
  author: string;
  supplier: string;
  publisher: string;
  language: string;
  weight: number;
  dimensions: string;
  releaseDate: number;
  format: string;
  numberOfPages: number;
  categories: number[];
  description: string;
  price: number;
  createAt: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  productId: number;
  userId: number;
  score: number;
  content: string;
  createAt: number;
  user?: User;
}

export interface Category {
  id: number;
  name: string;
}

export interface CommentForm {
  score: number;
  content: string;
}

export interface UserAction {
  type: string;
  payload: User;
}

export interface Account {
  email: string;
  password: string;
}
