import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getTopLevelDomain(hostname: string) {
  // 去除 'www.' 开头的情况
  if (hostname.startsWith('www.')) {
    hostname = hostname.substring(4);
  }

  // 分割主机名为数组，并取最后两个部分作为顶级域名
  const parts = hostname.split('.').filter(Boolean); // 过滤掉任何空字符串
  if (parts.length > 2) {
    // 如果有更多部分，可能是多级子域名，我们只保留最后两个部分
    return parts.slice(-2).join('.');
  } else {
    return hostname; // 如果少于或等于两个部分，则直接返回原字符串
  }
}

export function getDomainWithoutSubdomains(urlString: string) {
  try {
    const url = new URL(urlString);
    return getTopLevelDomain(url.hostname);
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

export function getDomain(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.hostname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}
