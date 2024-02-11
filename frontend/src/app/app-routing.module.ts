import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthguardGuard } from './Guard/authguard.guard';


const routes: Routes = [
  {path:"", component:DashboardComponent, canActivate:[AuthguardGuard]},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  // {path:"tasks", component:TasksComponent},
  {path:"**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
