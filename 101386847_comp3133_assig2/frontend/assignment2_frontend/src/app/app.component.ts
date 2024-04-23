import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {AuthService} from "./auth-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isValid()
    console.log(`Status : ${this.isUserLoggedIn}`);
  }
}
