'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';

export type Status = 'ALIVE' | 'DEAD' | 'UNKNOWN';
export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export interface Character {
  id: number;
  image: string;
  name: string;
  status: Status;
  gender: Gender;
  description: string;
}

export interface CharacterFilterInput {
  status?: Status | null;
  gender?: Gender | null;
  search?: string | null;
}

const GET_CHARACTERS_QUERY = `
  query GetCharacters($filter: CharacterFilterInput) {
    characters(filter: $filter) {
      id
      image
      name
      status
      gender
      description
    }
  }
`;

interface GetCharactersResponse {
  characters: Character[];
}

export function useCharacters(filter?: CharacterFilterInput) {
  return useQuery({
    queryKey: ['characters', filter],
    queryFn: async () => {
      const cleanFilter: CharacterFilterInput = {};

      if (filter?.status) {
        cleanFilter.status = filter.status;
      }
      if (filter?.gender) {
        cleanFilter.gender = filter.gender;
      }
      if (filter?.search) {
        cleanFilter.search = filter.search;
      }

      const hasFilters = Object.keys(cleanFilter).length > 0;

      const data = await graphqlClient.request<GetCharactersResponse>(
        GET_CHARACTERS_QUERY,
        { filter: hasFilters ? cleanFilter : undefined }
      );
      return data.characters;
    },
  });
}
