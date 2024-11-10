import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";
import { BotHttpResponse } from '../interfaces/http';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    return of(new HttpResponse({
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText,
                        url: response.url ? response.url : undefined,
                        body: {
                            error: true,
                        }
                      }));
                })
            )
    }
}