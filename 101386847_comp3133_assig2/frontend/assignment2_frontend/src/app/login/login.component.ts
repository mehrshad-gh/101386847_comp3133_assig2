import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userName!:string;
  password!:string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm:NgForm)
  {
    console.log(loginForm.value);
    this.userName = loginForm.value.username
    this.password = loginForm.value.password

    this.authService.login(this.userName, this.password)
      .subscribe( data => {
        console.log("Is Login Success: " + data);

        if(data){
          this.router.navigate(['/main'])
            .then(() => {
              window.location.reload();
            });
        }else{
          alert("Invalid username or password")
        }
      });
  }
}


