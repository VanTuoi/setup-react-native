import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Variables = Partial<User>;
type Response = User;

export const useUpdateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `users/${variables.id}`,
      method: 'PUT',
      data: variables,
    }).then((response) => response.data),
});
