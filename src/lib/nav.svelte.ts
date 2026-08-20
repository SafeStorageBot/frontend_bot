import type { DecryptedPasswordItem, PasswordItem } from './types';

export type View =
  | { name: 'home' }
  | { name: 'add' }
  | { name: 'verify'; mode: 'encrypt'; forEncrypt: DecryptedPasswordItem[] }
  | { name: 'verify'; mode: 'decrypt'; forDecrypt: PasswordItem[] }
  | { name: 'result'; items: DecryptedPasswordItem[] };

export const nav = $state<{ view: View }>({ view: { name: 'home' } });

export function go(view: View) {
  nav.view = view;
}

export function goHome() {
  nav.view = { name: 'home' };
}

export const toast = $state<{ message: string | null }>({ message: null });

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string) {
  toast.message = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.message = null;
  }, 1800);
}
