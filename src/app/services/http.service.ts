import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { defer, delay, finalize, Observable, of, Subject, switchMap } from "rxjs";
import { BotHttpResponse } from "../interfaces/http";
import { PasswordItem, UserInfo } from "../interfaces/item";
import { getRawTelegramData, ready } from "../interfaces/telegram";


@Injectable({
    providedIn: 'root',
})
export class HttpService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getRawTelegramData(),
    })

    constructor(private httpClient: HttpClient) {
        ready()
     }

    getUserInfo() {
        return this.httpClient.get<BotHttpResponse<UserInfo>>("/api/info", {
            headers: this.headers,
        })
    }

    getList(): Observable<BotHttpResponse<Array<PasswordItem>>> {
        return this.httpClient.get<BotHttpResponse<Array<PasswordItem>>>("/api/list", {
            headers: this.headers,
        })
    }

    add(item: PasswordItem): Observable<BotHttpResponse<any>> {
        return this.httpClient.post<BotHttpResponse<Array<PasswordItem>>>("/api/list", item, {
            headers: this.headers,
        })
    }

    remove(item: PasswordItem): Observable<BotHttpResponse<any>> {
        return this.httpClient.delete<BotHttpResponse<Array<PasswordItem>>>(`/api/list/${item.id}`, {
            headers: this.headers,
        })
    }
}
