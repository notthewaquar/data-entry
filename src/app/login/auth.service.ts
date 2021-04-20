import { Injectable } from "@angular/core";
import {
  HttpClient
  // HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

interface AuthResponseData {
  email: string;
  jwt: string;
  message: string;
  expireAt: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // baseUrl: string = "https://srvtechnology.com/api/User";
  baseUrl: string = "https://buckdattrend.com/api/User";
  
  user = new Subject<User>();
  userToken: string = null;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    const userData = `{
      "email": "${email}",
      "password": "${password}"
    }`;
    console.log(userData);
    return this.http.post<AuthResponseData>(
      this.baseUrl + "/login.php",
      userData
    ).pipe(
      tap(resDate => {
        const expirationDate = new Date(
          new Date().getTime() + +resDate.expireAt * 1000
        );
        console.log(expirationDate);
        this.userToken = resDate.jwt;
        const user = new User(
          resDate.email,
          resDate.jwt,
          resDate.message,
          expirationDate
        )
        localStorage.setItem("userData", JSON.stringify(user));
        this.isAuthenticated = true;
        this.user.next(user);
      })
    );
  }
  logout() {
    this.user.next(null);
    this.userToken = null;
    this.router.navigate(['login']);
    // localStorage.clearItem("userData")
    localStorage.removeItem("userData");
  }
  autoLogin() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      console.log(userData);
      this.userToken = userData.jwt;
      this.router.navigate(['create-form']);
      this.user.next(userData);
      console.log(!!this.user);
    } else {
      this.userToken = null;
    }
    // const loadedUser = new User();
  }
}
// const headers = new HttpHeaders({
//   'content-type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'mode': 'no-cors'
// });
// headers = headers.append('content-type','application/json')
// headers = headers.append('Access-Control-Allow-Origin', '*')
// headers = headers.append('content-type','application/x-www-form-urlencoded')