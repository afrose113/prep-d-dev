import ax, {AxiosResponse} from 'axios';

export interface IApiError<T = string> {
  errors: T[];
}

export const axios = ax.create({});

axios.interceptors.response.use(
  function (
    res: AxiosResponse<
      [{success: boolean; message: string; [x: string]: any}],
      any
    >,
  ) {
    if (!res.data[0]?.success === false) {
      console.log('ERROR :: ', res.data[0]);

      return Promise.reject({errors: [res.data[0].message]});
    }

    return res;
  },

  function (error) {
    console.log('error', error.response);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const defaultMessage = 'Something went wrong, please try again.';

    console.log('ERROR :: ', error.response);
    const message = error?.response?.data?.detail ||
      error?.response?.data?.message || [error?.message, defaultMessage]; // on PROD we'll change this to [defaultMessage, error?.message]

    return Promise.reject({errors: [message].flat(2)});
  },
);
