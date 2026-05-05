import { Category } from "./category";

export interface Algorithm {
  id: string;
  name: string;
  slug: string;
  category: Category;

  shortDescription: string;
  fullDescription: string;

  applications: string[];
  characteristics: string[];

  complexity?: string;

  advantages?: string[];
  limitations?: string[];

  tags?: string[];
}