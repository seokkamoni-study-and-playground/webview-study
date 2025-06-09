import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CatImage } from '@/types/cat';

export const fetchCatDetail = async (id: string) => {
  const response = await axios.get<CatImage>(
    `https://api.thecatapi.com/v1/images/${id}`
  );

  return response.data;
};

export const useCatDetail = (id: string) =>
  useSuspenseQuery({
    queryKey: ['catDetail', id],
    queryFn: () => fetchCatDetail(id),
  });
