import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ResponseData } from '../types';
import { getCoursesMock } from './courses-mock';
import { type Course } from './types';

type Response = ResponseData<Course[]>;
type Variables = { search?: string };

export const useCourses = createQuery<Response, Variables, AxiosError>({
  queryKey: ['Courses'],
  fetcher: async ({ search }) => {
    return await getCoursesMock({ search });
  },
});
