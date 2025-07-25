import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { updateCourseMock } from './courses-mock';
import { type Course } from './types';

type Variables = Partial<Course> & { id: string };
type Response = ResponseData<Course>;

export const useUpdateCourse = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return await updateCourseMock(variables);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
