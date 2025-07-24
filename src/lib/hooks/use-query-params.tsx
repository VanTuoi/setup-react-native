import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';

export function useQueryParams<T extends Record<string, string | undefined>>(
  defaultParams: T
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramObj: T = {
    ...defaultParams,
    ...Object.fromEntries(searchParams.entries()),
  } as T;

  const setQuery = (newParams: Partial<T>) => {
    const merged = {
      ...paramObj,
      ...newParams,
    };

    const filtered = Object.fromEntries(
      Object.entries(merged).filter(
        ([_, value]) => value !== undefined && value !== ''
      )
    );

    router.setParams(filtered);
  };

  return {
    queryParams: paramObj,
    setQuery,
  };
}
