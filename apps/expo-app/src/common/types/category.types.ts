export enum CategoryType {
  CUSTOM = "custom",
  SYSTEM = "system",
}

export enum CategoryTaxonomy {
  EXPENSE = "expense",
  INCOME = "income",
}

export type CategoryInfo = {
  id: number;
  userId?: string;
  thumbnail?: string;
  name: string;
  type: CategoryType;
  taxonomy: CategoryTaxonomy;
  categoryId?: string;
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
};
