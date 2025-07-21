import { delay } from '@/lib';

import { type LoginResponse } from '../auth/type';
import { type ResponseData } from '../types';

export async function loginMock({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ResponseData<LoginResponse>> {
  await delay(1000);

  if (email === 'admin@example.com' && password === '123456') {
    return {
      message: 'Login successful',
      success: true,
      data: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
      },
      errors: {},
    };
  } else {
    const errorResponse: ResponseData<null> = {
      message: 'Invalid email or password',
      success: false,
      data: null,
      errors: {
        email: ['Invalid email or password'],
      },
    };

    throw {
      response: {
        data: errorResponse,
      },
    };
  }
}
