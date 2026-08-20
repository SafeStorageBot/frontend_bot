export interface BotHttpResponse<T> {
  response?: T;
  error?: boolean;
}

export interface PasswordItem {
  id: string;
  title: string;
  icon?: string;
  encryptedPassword?: string;
  error?: boolean;
}

export interface UserInfo {
  until?: string;
  passwords: number;
  limit: number;
}

export interface DecryptedPasswordItem {
  id?: string;
  title: string;
  icon?: string;
  password?: string;
  error?: boolean;
}
