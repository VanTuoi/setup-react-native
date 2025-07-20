import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type ResponseData } from '../types';
import { type LoginResponse } from './type';

type Variables = { email: string; password: string };
type Response = ResponseData<LoginResponse>;

const fakeLogin = async ({ email, password }: Variables): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === '123456') {
        resolve({
          message: 'Login successful',
          success: true,
          data: {
            access: 'fake-access-token',
            refresh: 'fake-refresh-token',
          },
          errors: {},
        });
      } else {
        reject({
          response: {
            data: {
              message: 'Invalid email or password',
              success: false,
              data: null,
              errors: {
                email: ['Invalid email or password'],
              },
            },
          },
        });
      }
    }, 1000);
  });
};

export const useLogin = createMutation<
  Response,
  Variables,
  AxiosError<ResponseData<null>>
>({
  mutationFn: fakeLogin,
});
