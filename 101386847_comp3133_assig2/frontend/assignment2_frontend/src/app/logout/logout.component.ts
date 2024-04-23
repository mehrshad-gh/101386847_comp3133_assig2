import { Component } from '@angular/core';
import {AuthService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
