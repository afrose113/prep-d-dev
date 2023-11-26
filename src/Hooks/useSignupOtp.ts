import { IApiError, axios } from "@/Hooks/axios.config";
import { useAppSelector } from "@/Store";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface ISignupArgs {
  phone: string;
  otp: number | undefined;
  user: {
    full_name: string;
    email: string;
  };
}

type ISignupResult = {
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
    username: string;
  };
};

async function signup(args: ISignupArgs, apiUrl: string) {
  const endpoint = `${apiUrl}/sign-up`;
  const res = await (await axios).post<ISignupResult>(endpoint, args);
  return res.data;
}

export const useSignupOtp = (
  config: MutationOptions<ISignupResult, IApiError, ISignupArgs> = {}
) => {
  const apiUrl = useAppSelector((state) => state.local.apiUrl);
  const mutation = useMutation(
    (args: ISignupArgs) => signup(args, apiUrl),
    config
  );

  return mutation;
};
