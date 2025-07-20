import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ResponseData } from '../types';
import { getUsersMock } from './mock';
import type { User } from './types';

type Response = ResponseData<User[]>;
type Variables = void;

export const useUsers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: async () => {
    return await getUsersMock();
  },
});
