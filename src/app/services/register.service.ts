import { Injectable } from '@angular/core';
import {Constants} from '../constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {}

  registerUser(user) {
    return this.httpClient.post(Constants.REGISTER_USER, JSON.stringify(user));
  }
}
