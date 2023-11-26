import { IApiError, axios } from "@/Hooks/axios.config";
import { useAppSelector } from "@/Store";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface IFavArgs {
  user_id: string | undefined;
  dish_name: string | undefined;
}

export type IFavResult = {
  id: string;
  name: string;
  price: number;
  description: string;
  cuisine_type: string;
  preparation_link: string;
  image: string;
  pdf: string;
  approval_admin: boolean;
  approval_cloud: boolean;
  total_orders: number;
  user_id: string;
  ingredients: {
    type: string;
    brand: string;
    quantity: number;
    unit: string;
  }[];
  method: string;
  is_draft: boolean;
  category: string;
  rating: number;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
};

async function search(args: IFavArgs, apiUrl: string, access_token?: string) {
  const endpoint = `${apiUrl}/favourite_dish`;
  const res = await axios.post<IFavResult[]>(endpoint, args, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
}

export const useSearch = (
  config: MutationOptions<IFavResult[], IApiError, IFavArgs> = {}
) => {
  const { apiUrl, access_token } = useAppSelector((state) => state.local);
  const mutation = useMutation(
    (args: IFavArgs) => search(args, apiUrl, access_token),
    config
  );
  return mutation;
};
