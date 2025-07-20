import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Variables = { id: string };
type Response = User;

export const useUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: (variables) => {
    return client
      .get(`users/${variables.id}`)
      .then((response) => response.data);
  },
});
