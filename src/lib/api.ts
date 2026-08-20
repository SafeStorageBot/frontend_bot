import type { BotHttpResponse, PasswordItem, UserInfo } from './types';
import { getRawTelegramData } from './telegram';

async function request<T>(path: string, init: RequestInit = {}): Promise<BotHttpResponse<T>> {
  try {
    const response = await fetch(path, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getRawTelegramData(),
      },
    });
    if (!response.ok) {
      return { error: true };
    }
    return (await response.json()) as BotHttpResponse<T>;
  } catch {
    return { error: true };
  }
}

export const api = {
  info: () => request<UserInfo>('/api/info'),
  list: () => request<PasswordItem[]>('/api/list'),
  add: (item: PasswordItem) =>
    request<unknown>('/api/list', { method: 'POST', body: JSON.stringify(item) }),
  remove: (item: PasswordItem) =>
    request<unknown>(`/api/list/${item.id}`, { method: 'DELETE' }),
};
