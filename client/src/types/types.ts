export interface User {
  isLock: boolean;
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
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
  typeId: number;
  description: string;
  quantity: number;
  createAt: number;
  comments?: Comment[];
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

export interface CategoriesAction {
  type: string;
  payload: Category[];
}

export interface Account {
  email: string;
  password: string;
}

export interface ProfileInfo {
  avatar: string;
  name: string;
  phone: string;
}

export interface SearchParams {
  categoryId: string;
  _order: string;
  title_like: string;
}

export interface Order {
  id: number;
  userId: number;
  productId: number;
  status: number;
  borrowedDate: number;
  returnDate: number;
  createAt: Date;
  product: Book;
}

export interface OrderDetail extends Order {
  product: Book;
}

export interface OrderInfo extends Order {
  user: User;
  product: Book;
}

export interface BookInfo extends Book {
  type: Category;
}
