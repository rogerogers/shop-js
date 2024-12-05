import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformToTree(data: any, key: string, parentId = '') {
  let result = [];
  for (let item of data) {
    if (item.parent_id === parentId) {
      let children = transformToTree(data, key, item[key]);
      if (children.length > 0) {
        item.children = children;
      }
      result.push(item);
    }
  }
  return result;
}

export function toTitle(slug: string): string {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
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
