
import { ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: ReactNode;

  overview: string;

  features: string[];

  benefits: string[];

  useCases: string[];

  specifications: {
    label: string;
    value: string;
  }[];
}