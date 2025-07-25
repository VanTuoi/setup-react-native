import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { changeStatusCourseMock } from './courses-mock';
import type { Course } from './types';

type Variables = {
  id: string;
  status: 'show' | 'hidden';
};
type Response = ResponseData<Course>;

export const useChangeStatusCourse = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async ({ id, status }) => {
    return await changeStatusCourseMock(id, status);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['Course'] });
  },
});
