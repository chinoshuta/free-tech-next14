export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: string;
  category: Category;
  publishedAt: string;
};

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type Data<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
