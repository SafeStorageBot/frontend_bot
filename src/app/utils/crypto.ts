import { AES, enc } from 'crypto-js';

export interface CryptoResponse {
    value?: string;
    error: boolean;
}

export async function encrypt(plaintext: string, password: string): Promise<CryptoResponse> {
    try {
        const value = AES.encrypt(plaintext, password).toString()
        return {
            value: value,
            error: false,
        }
    } catch (_) {
        return {
            error: true,
        }
    }
}

export async function decrypt(plaintext: string, password: string): Promise<CryptoResponse> {
    try {
        const value = AES.decrypt(plaintext, password).toString(enc.Utf8)
        if (!value) {
            return {
                error: true,
            }
        }
        return {
            value: value,
            error: false,
        }
    } catch (_) {
        return {
            error: true,
        }
    }
}