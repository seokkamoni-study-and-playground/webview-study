import { QueryFunctionContext, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CatImage } from '@/types/cat';

const LIMIT = 10;

export interface FetchCatsResponse {
  cats: CatImage[];
  nextPage: number;
  hasMore: boolean;
}

const fetchCats = async ({ pageParam }: QueryFunctionContext): Promise<FetchCatsResponse> => {
  const page = typeof pageParam === 'number' ? pageParam : 0;
  const response = await axios.get<CatImage[]>('https://api.thecatapi.com/v1/images/search', {
    params: { limit: LIMIT, page: pageParam },
  });

  const cats = response.data;

  return {
    cats,
    nextPage: page + 1,
    hasMore: cats.length === LIMIT,
  };
};

export const useInfiniteCats = () =>
  useSuspenseInfiniteQuery<FetchCatsResponse, AxiosError>({
    queryKey: ['cats'],
    queryFn: fetchCats,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 0,
  });
