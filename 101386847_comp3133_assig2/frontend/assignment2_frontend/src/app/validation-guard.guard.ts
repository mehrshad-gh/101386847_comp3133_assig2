import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class validationGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url: string = state.url;
    let val = localStorage.getItem('isUserLoggedIn');

    if(val != null && val == "true"){
      if(url == "/login"){
        return this.router.parseUrl('/home');
      }else{
        return true;
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }

}
