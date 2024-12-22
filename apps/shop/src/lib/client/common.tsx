import { stringify } from 'qs';

const baseUrl =
  process.env.NEXT_PUBLIC_SHOP_BACKEND_URL || 'http://localhost:5000';

const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function getUrl(path: any, query: any) {
  const params = query ? stringify(query) : null;

  return `${baseUrl}${path}${params ? `?${params}` : ''}`;
}

function getBody(payload: any) {
  return payload ? JSON.stringify(payload) : undefined;
}

function getOptions(options: any, payload: any) {
  const body = getBody(payload);

  return {
    ...options,
    headers: {
      ...commonHeaders,
      ...options?.headers,
    },
    body,
    credentials: 'include',
  };
}

async function makeRequest(
  path: string,
  payload: any,
  query: Map<string, string> | undefined,
  options: any,
) {
  const url = getUrl(path, query);
  const requestOptions = getOptions(options, payload);

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const errorData = await response.json();

    // Temp: Add a better error type
    throw new Error(`API error ${response.status}: ${errorData.message}`);
  }

  return await response.json();
}

export async function getRequest(
  path: string,
  query: Map<string, string>,
  options: any,
) {
  return makeRequest(path, undefined, query, {
    ...options,
    method: 'GET',
  });
}

export async function postRequest(
  path: string,
  payload: Map<string, string>,
  options: any,
) {
  return makeRequest(path, payload, undefined, {
    ...options,
    method: 'POST',
  });
}

export async function deleteRequest(path: string, options: any) {
  return makeRequest(path, undefined, undefined, {
    ...options,
    method: 'DELETE',
  });
}
