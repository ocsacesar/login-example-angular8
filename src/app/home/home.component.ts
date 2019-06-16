import { Component, OnInit } from '@angular/core';
import {JwtService} from '../services/jwt.service';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '[Message from server]';

  constructor(
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) {
    this.notificationService.getNotification().subscribe(
      res => {
        this.message = res['message'];
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}

  logout() {
    // remove user from local storage to log user out
    this.jwtService.destroyToken();
  }

}
