import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {first} from 'rxjs/internal/operators';
import {JwtService} from '../services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  invalidCredentials = false;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ) {

    if (this.jwtService.getToken()) {
      this.router.navigate(['home']);
    }

    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.loginForm.value);
  }

  login(data) {
    this.loginService.login(data).pipe(first())
      .subscribe(
        res => {
          if (res && res['accessToken']) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.jwtService.saveToken(res['accessToken']);
            this.router.navigate(['/home']);
          }
        },
        error => {
          if (error.error.statusCode === 404) {
            this.invalidCredentials = true;
          }
        });
  }

  ngOnInit() {}

}
