import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3001/graphql',
  documents: 'src/graphql/**/*.ts',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
