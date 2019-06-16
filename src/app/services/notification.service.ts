import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  getNotification() {
    return this.httpClient.post(Constants.NOTIFICATIONS, null);
  }

}
