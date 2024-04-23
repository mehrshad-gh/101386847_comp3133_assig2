import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AddComponent} from "./add/add.component";
import {DeleteComponent} from "./delete/delete.component";
import {DetailsComponent} from "./details/details.component";
import {UpdateComponent} from "./update/update.component";
import {validationGuardGuard} from "./validation-guard.guard";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'main', component: MainComponent, canActivate: [validationGuardGuard]},
  {path: 'add-employee', component: AddComponent, canActivate: [validationGuardGuard]},
  {path: 'delete-employee/:id', component: DeleteComponent, canActivate: [validationGuardGuard]},
  {path: 'view-employee/:id', component: DetailsComponent, canActivate: [validationGuardGuard]},
  {path: 'update-employee/:id', component: UpdateComponent, canActivate: [validationGuardGuard]},
];
