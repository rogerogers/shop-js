/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

export function transformToTree(data: any, key: string, parentId = '') {
  const result = [];
  for (const item of data) {
    if (item.parent_id === parentId) {
      const children = transformToTree(data, key, item[key]);
      if (children.length > 0) {
        item.children = children;
      }
      result.push(item);
    }
  }
  return result;
}

export function toTitle(slug: string): string {
  const words = slug.split('-');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function cartesianProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce(
    (a, b) => {
      return a.flatMap((d) => b.map((e) => [...d, e]));
    },
    [[]] as T[][],
  );
}

export function genUuidv4() {
  return uuidv4();
}
