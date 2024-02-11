import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { interval } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  interval: number = 1200;
  show = false;


  constructor(private authService: AuthService, private router: Router, 
    private session:SessionService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();   
    this.userLoggedIn();
  }


  userLoggedIn(){
    this.session.isLoggedIn().subscribe((loggedIn:boolean)=>{
      if(loggedIn){
        this.router.navigate(['/']);
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      username: new FormControl("",[Validators.required, Validators.minLength(3)]),
      password: new FormControl("",[Validators.required, Validators.minLength(4)])

    })
  } 

  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }

  onSubmit():void{
    console.log('Form submitted:', this.loginForm.value);

      this.authService.login(this.loginForm.value)
      .subscribe(
        {
          next: (response) => {
            console.log('Login successful:', response);
            this.openSnackBar("Welcome Back :)");
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Login error:', error);
            if(error.status===401){
              this.openSnackBar("Invalid Credentials :(");
              this.loginForm.reset();
            }
          },
        }
        );
  }


  passwordVisibility(event: MouseEvent){
    this.show=!this.show;
    event.stopPropagation();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  // getErrorMessage() {
  //   if (this.username.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   if(this.password.hasError('required')){
  //     return 'You must provide a password';
  //   }

  //   return this.username.hasError('email') ? 'Not a valid email' : '';
  // }

}
