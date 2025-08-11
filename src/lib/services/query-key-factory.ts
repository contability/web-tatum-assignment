export const QUERY_KEYS = {
  CLOUD: 'CLOUD',
} as const;

export const QUERY_KEY_FACTORY = (queryKey: keyof typeof QUERY_KEYS) => {
  const all = [QUERY_KEYS[queryKey]] as const;
  const lists = () => [...all, 'list'] as const;
  const details = [...all, 'detail'] as const;
  const detail = (id: number) => [...details, id] as const;
  const mutations = [...all, 'mutations'] as const;
  const mutation = <T>(action: string, data?: T) => [...mutations, action, data] as const;

  return { lists, detail, mutation };
};
