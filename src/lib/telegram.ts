export interface TelegramBackButton {
  isVisible: boolean;
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
}

export interface TelegramHapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
  notificationOccurred(type: 'error' | 'success' | 'warning'): void;
}

export interface WebApp {
  initData: string;
  version?: string;
  colorScheme?: 'light' | 'dark';
  BackButton?: TelegramBackButton;
  HapticFeedback?: TelegramHapticFeedback;
  expand(): void;
  ready(): void;
  disableVerticalSwipes?(): void;
  isVersionAtLeast?(version: string): boolean;
}

// The telegram-web-app.js script may fail to load, or the app may be opened
// in a plain browser, so every access must tolerate a missing global.
export function getWebApp(): WebApp | undefined {
  return (window as { Telegram?: { WebApp: WebApp } }).Telegram?.WebApp;
}

export function getRawTelegramData(): string {
  return getWebApp()?.initData ?? '';
}

// The client reports its Mini App API version at runtime (WebApp.version);
// features newer than that version must not be called or the official script
// logs "not supported in version X" warnings.
function supports(version: string): boolean {
  return !!getWebApp()?.isVersionAtLeast?.(version);
}

export function ready() {
  const webApp = getWebApp();
  if (!webApp) {
    return;
  }
  webApp.ready();
  webApp.expand();
  if (supports('7.7')) {
    webApp.disableVerticalSwipes?.();
  }
}

function getTelegramData(): Record<string, string> {
  return getRawTelegramData()
    .split('&')
    .reduce((prev, current) => {
      const [key, value] = current.split('=', 2);
      prev[key] = value;
      return prev;
    }, {} as Record<string, string>);
}

export function getDefaultLang(): 'en' | 'ru' {
  try {
    const user = JSON.parse(decodeURIComponent(getTelegramData()['user']));
    return user['language_code'] === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

export function setBackButtonVisible(visible: boolean) {
  const backButton = getWebApp()?.BackButton;
  if (!backButton || !supports('6.1')) {
    return;
  }
  if (visible) {
    backButton.show();
  } else {
    backButton.hide();
  }
}

export function onBackButton(callback: () => void) {
  if (!supports('6.1')) {
    return;
  }
  getWebApp()?.BackButton?.onClick(callback);
}

export function hapticNotification(type: 'error' | 'success' | 'warning') {
  getWebApp()?.HapticFeedback?.notificationOccurred(type);
}
