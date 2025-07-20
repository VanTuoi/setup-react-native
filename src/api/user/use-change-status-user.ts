import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { changeStatusUserMock } from './mock';
import type { User } from './types';

type Variables = {
  id: string;
  status: 'active' | 'block' | 'graduated';
};
type Response = ResponseData<User>;

export const useChangeStatusUser = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async ({ id, status }) => {
    return await changeStatusUserMock(id, status);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
