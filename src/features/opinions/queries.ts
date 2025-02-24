import { opinionsApis } from '@/features/opinions/apis';
import { useQuery } from '@tanstack/react-query';

const opinionsKeys = {
  all: ['opinions'] as const,
};

export const useOpinionsQuery = {
  getOpinionsList: () =>
    useQuery({ queryKey: opinionsKeys.all, queryFn: opinionsApis.getOpinions }),
};
