import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';
// import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    // private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
    if ( !form.valid ) {
      return;
    }
    this.isLoading = true;
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe(
      resData => {
        this.router.navigate(['dashboard']);
        console.log(resData);
        this.isLoading = false;
      }
      ,
      error => {
        console.log(error);
        let errMessage = "An unknown error occured !!";
        if (
          error.error &&
          error.error.message
        ) {
          if (
            error.error.message === "USER_NOT_FOUND"
          ) {
            errMessage = "No user found with this email address!"
          } else if (
            error.error.message === "PASSWORD_INCORRECT"
          ) {
            errMessage = "Password didn't match, please try again"
          }
        }
        this.openSnackBar(
          errMessage,
          "okay"
        )
        this.isLoading = false;
      }
    );
    // form.reset();
  }
  gotoHomePage() {
    this.router.navigate(['']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}
