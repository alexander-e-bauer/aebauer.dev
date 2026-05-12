import { API_BASE_URL, baseHeaders } from './config';
import { ApiError } from './errors';
import { getToken, removeToken } from './token';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

const handleUnauthorized = () => {
  if (window.location.pathname === '/login') return;
  removeToken();
  window.location.href = '/login';
};

export async function request<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const { method = 'GET', headers, body, signal } = opts;

  const token = getToken();
  const hasBody = body != null;

  const finalHeaders: Record<string, string> = {
    ...baseHeaders,
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...(headers || {}),
  };

  if (token) finalHeaders['Authorization'] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError({
        message: 'Network error - please check your connection',
        status: 0,
        details: error.message,
      });
    }
    throw new ApiError({ message: 'An unexpected error occurred', status: 500, details: error });
  }

  const contentType = res.headers.get('content-type') || '';
  const isJsonResponse = contentType.includes('application/json');

  let data: any = null;
  try {
    data = isJsonResponse ? await res.json() : await res.text();
  } catch {
    // ignore parse errors
  }

  if (res.status === 401) {
    handleUnauthorized();
    throw new ApiError({ message: 'Unauthorized - please log in again', status: 401, details: data });
  }

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.detail || data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      `Request failed with status ${res.status}`;

    throw new ApiError({
      message,
      status: res.status,
      code: data?.code,
      details: data,
    });
  }

  return data as T;
}