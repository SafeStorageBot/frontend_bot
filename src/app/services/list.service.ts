import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BotHttpResponse } from '../interfaces/http';
import { DecryptedPasswordItem, PasswordItem, UserInfo } from '../interfaces/item';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {

  constructor(private httpService: HttpService) { }

  info() {
    return this.httpService.getUserInfo()  
  }

  get() {
    return this.httpService.getList()
  }

  add(item: PasswordItem){
    return this.httpService.add(item)
  }

  remove(item: PasswordItem) {
    return this.httpService.remove(item)
  }
}