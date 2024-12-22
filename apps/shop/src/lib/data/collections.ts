import { getRequest } from '../client/common';
export const collection_detail = (handle: string, page?: string) => {
  const q = new Map<string, string>();
  if (page) {
    q.set('p', page);
  }
  return getRequest(`/api/collections/${handle}`, q, {});
};
