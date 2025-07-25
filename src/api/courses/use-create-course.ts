import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { createCourseMock } from './courses-mock';
import { type Course } from './types';

type Variables = Course;
type Response = ResponseData<Course>;

export const useCreateCourse = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return await createCourseMock(variables);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
