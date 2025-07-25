import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { deleteCourseMock } from './courses-mock';

type Variables = { id: string };
type Response = ResponseData<null>;

export const useDeleteCourse = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ id }) => {
    return await deleteCourseMock(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
