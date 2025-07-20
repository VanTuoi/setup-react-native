import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = {
  id: string;
  status: 'active' | 'block' | 'graduated';
};

export const useChangeStatusUser = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async ({ id, status }) =>
    client({
      url: `/user/${id}/status`,
      method: 'PATCH',
      data: { status },
    }).then((response) => response.data.data),
});
