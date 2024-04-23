import {Injectable} from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn = false

  constructor() {
  }

  //Login
  login(userName: string, password: string): Observable<boolean> {
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  isValid(): boolean {
    let storeData = localStorage.getItem("isUserLoggedIn");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true") {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }

    return this.isUserLoggedIn;
  }

}
