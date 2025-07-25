import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ResponseData } from '../types';
import { getCourseMock } from './courses-mock';
import type { Course } from './types';

type Variables = { id: string };
type Response = ResponseData<Course>;

export const useCourse = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: async (variables) => {
    return await getCourseMock(variables.id);
  },
});
