import { IApiError, axios } from "@/Hooks/axios.config";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface ILoginArgs {
  phone: string;
  otp: number;
}

export type ILoginResult = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: {};
    identities: [
      {
        id: string;
        user_id: string;
        identity_data: {
          email: string;
          sub: string;
        };
        provider: string;
        last_sign_in_at: string;
        created_at: string;
        updated_at: string;
      }
    ];
    created_at: string;
    updated_at: string;
    full_name: string;
    image: null;
    username: string;
  };
};

async function login(args: ILoginArgs, apiUrl: string) {
  const endpoint = `${apiUrl}/sign-in/app`;
  const res = await axios.post<ILoginResult>(endpoint, args);
  const { data: session } = await supabase.auth.setSession({
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token,
  });
  return res.data;
}

export const useLogin = (
  config: MutationOptions<ILoginResult, IApiError, ILoginArgs> = {}
) => {
  const apiUrl = useAppSelector((state) => state.local.apiUrl);
  const mutation = useMutation(
    (args: ILoginArgs) => login(args, apiUrl),
    config
  );
  return mutation;
};
