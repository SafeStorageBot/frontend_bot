import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DecryptedPasswordItem, PasswordItem } from '../interfaces/item';
import { CryptoResponse, decrypt, encrypt } from '../utils/crypto';

@Injectable({
    providedIn: 'root',
})
export class VerifyService {

    constructor() { }

    decrypt(list: Array<PasswordItem>, keypass: string): Observable<Array<DecryptedPasswordItem>> {
        return from(Promise.all(list.map((item) => {
            return new Promise<DecryptedPasswordItem>((res, _) => {
                return decrypt(item.encryptedPassword!, keypass).then((resp: CryptoResponse) => {
                    res({
                        id: item.id || "",
                        title: item.title,
                        icon: item.icon,
                        password: !!resp.error ? undefined : resp.value!,
                        error: resp.error ? true : false,
                    })
                })
            })
        })))
    }

    encrypt(list: Array<DecryptedPasswordItem>, keypass: string): Observable<Array<PasswordItem>> {
        return from(Promise.all(list.map((item) => {
            return new Promise<PasswordItem>((res, _) => {
                return encrypt(item.password!, keypass).then((resp: CryptoResponse) => {
                    res({
                        id: item.id || "",
                        title: item.title,
                        icon: item.icon,
                        encryptedPassword: resp.error ? undefined : resp.value!,
                        error: resp.error ? resp.error! : undefined,
                    })
                })
            })
        })))
    }
}