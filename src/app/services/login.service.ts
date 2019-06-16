import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(Constants.LOGIN, JSON.stringify(data));
  }

}
