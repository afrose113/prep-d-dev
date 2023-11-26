import { IApiError, axios } from "@/Hooks/axios.config";
import { useAppSelector } from "@/Store";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface ICommonArgs {
  user_id: string | undefined;
  type: string | undefined;
  search_val?: string | undefined;
  is_favorite?: boolean | undefined;
  cuisine_type?: string;
  trending?: boolean | undefined;
}

export type ICommonResult = {
  cuisine: ICuisineResult[];
  dish: IDishResult[];
  influencer: IInfluenceResult[];
};

export type ICuisineResult = {
  id: string;
  type: string;
  image: string;
  is_favorite: boolean;
};

export type IInfluenceResult = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  image: string;
  username: string;
  role: string;
  total_orders: number;
  intagram_id: string;
  snapchat_id: string;
  mobile_number: string;
  is_favorite: boolean;
};

export type IDishResult = {
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
  influencer_name: string;
  is_favorite: boolean;
};

async function cuisine(
  args: ICommonArgs,
  apiUrl: string,
  access_token?: string
) {
  const endpoint = `${apiUrl}/common_search`;
  const res = await axios.post<ICommonResult>(endpoint, args, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
}

export const useCommon = (
  config: MutationOptions<ICommonResult, IApiError, ICommonArgs> = {}
) => {
  const { apiUrl, access_token } = useAppSelector((state) => state.local);
  const mutation = useMutation(
    (args: ICommonArgs) => cuisine(args, apiUrl, access_token),
    config
  );
  return mutation;
};
