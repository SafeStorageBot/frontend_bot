export interface PasswordItem {
    id: string;
    title: string;
    icon?: string;
    encryptedPassword?: string;
    error?: boolean
}

export interface UserInfo {
    until?: string
    passwords: number;
    limit: number;
}

export interface DecryptedPasswordItem {
    id?: string;
    title: string;
    icon?: string;
    password?: string;
    error?: boolean
}

export enum VerifyStates {
    Encrypt,
    Decrypt,
}

export interface VerifyState {
    forDecrypt?: Array<PasswordItem>;
    forEncrypt?: Array<DecryptedPasswordItem>;
    state: VerifyStates;
}

export interface ResultState {
    items: Array<DecryptedPasswordItem>;
}

