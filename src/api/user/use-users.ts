import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { UsersResponse } from './types';

type Response = UsersResponse;
type Variables = void;

export const useUsers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: async () => {
    const res = await client.get('users');
    return res.data;
  },
});
