export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: string;
  category: Category;
  publishedAt: string;
  publishDate: string;
};

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type DataList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
