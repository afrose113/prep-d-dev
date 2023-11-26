export type BestSellers = {
  approval_admin?: boolean;
  approval_cloud?: boolean;
  cuisine_type?: string;
  category?: string;
  description?: string;
  id?: string;
  image?: string;
  ingredients?: {
    brand: string;
    quantity: number;
    type: string;
    unit: string;
  }[];
  is_draft?: boolean;
  method?: string;
  name?: string | undefined;
  pdf?: string | null;
  preparation_link?: string;
  price?: string;
  total_orders?: number;
  user_id?: string;
};
