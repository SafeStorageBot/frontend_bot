// crypto-js AES (OpenSSL EVP key derivation) is kept deliberately: secrets
// already stored by users are in this format and must remain decryptable.
// The modules are imported dynamically so they stay out of the startup bundle.
export interface CryptoResponse {
  value?: string;
  error: boolean;
}

async function loadCrypto() {
  const [{ default: AES }, { default: Utf8 }] = await Promise.all([
    import('crypto-js/aes'),
    import('crypto-js/enc-utf8'),
  ]);
  return { AES, Utf8 };
}

export async function encrypt(plaintext: string, password: string): Promise<CryptoResponse> {
  try {
    const { AES } = await loadCrypto();
    return { value: AES.encrypt(plaintext, password).toString(), error: false };
  } catch {
    return { error: true };
  }
}

export async function decrypt(ciphertext: string, password: string): Promise<CryptoResponse> {
  try {
    const { AES, Utf8 } = await loadCrypto();
    const value = AES.decrypt(ciphertext, password).toString(Utf8);
    if (!value) {
      return { error: true };
    }
    return { value, error: false };
  } catch {
    return { error: true };
  }
}
