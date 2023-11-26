import { IApiError, axios } from "@/Hooks/axios.config";
import { useAppSelector } from "@/Store";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface ISignupArgs {
  phone: string;
}

type ISignupResult = { message: string };

async function signup(args: ISignupArgs, apiUrl: string) {
  const endpoint = `${apiUrl}/otp/sign-up`;
  const res = await (await axios).post<ISignupResult>(endpoint, args);
  return res.data;
}

export const useSignup = (
  config: MutationOptions<ISignupResult, IApiError, ISignupArgs> = {}
) => {
  const apiUrl = useAppSelector((state) => state.local.apiUrl);
  const mutation = useMutation(
    (args: ISignupArgs) => signup(args, apiUrl),
    config
  );

  return mutation;
};
