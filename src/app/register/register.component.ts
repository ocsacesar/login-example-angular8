import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import {first} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {JwtService} from '../services/jwt.service';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private registerService: RegisterService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.createUser(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  createUser(data) {
    this.registerService.registerUser({name: data.name, username: data.username, password: data.password}).pipe(first())
      .subscribe(
        res => {
          if (res && res['accessToken']) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.jwtService.saveToken(res['accessToken']);
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
  }

}
