export function graphql(query: string | TemplateStringsArray): string {
  if (typeof query === 'string') {
    return query;
  }
  return query[0];
}
