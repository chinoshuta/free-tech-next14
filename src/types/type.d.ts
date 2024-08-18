export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: string;
  categories: Category[];
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

export type ContentsStatus = "PUBLISH" | "DRAFT" | "CLOSED";

export type WebHookParams<T> = {
  service: string;
  api: string;
  id: string;
  type: string;
  contents: {
    old: {
      id: string;
      status: ContentsStatus[];
      draftKey: string | null;
      publishValue: T;
      draftValue: T | null;
    };
    new: {
      id: string;
      status: ContentsStatus[];
      draftKey: string | null;
      publishValue: T;
      draftValue: T | null;
    };
  };
};
