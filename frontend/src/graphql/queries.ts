import { graphql } from './generated';

export const GET_CHARACTERS = graphql(`
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
`);

export const GET_CHARACTER = graphql(`
  query GetCharacter($id: Int!) {
    character(id: $id) {
      id
      image
      name
      status
      gender
      description
      createdAt
      updatedAt
    }
  }
`);
