import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Variables = User;
type Response = User;

export const useAddUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/add',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
