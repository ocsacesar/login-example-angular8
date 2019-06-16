import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) {}

  jwtTokenKey = 'jwtToken';

  getToken(): string {
    return window.localStorage[this.jwtTokenKey];
  }

  saveToken(token: string) {
    window.localStorage[this.jwtTokenKey] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(this.jwtTokenKey);
    this.router.navigate(['/login']);
  }
}
