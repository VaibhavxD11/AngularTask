import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { validField } from './space.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  show = false;
  showCnf = false;

  constructor(private authService: AuthService, private router: Router, 
    private session: SessionService,private _snackBar: MatSnackBar,){}
  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
    this.session.isLoggedIn().subscribe((loggedIn:boolean)=>{
      if(loggedIn){
        this.router.navigate(['/']);
      }
    });

  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      username: new FormControl("",[Validators.required, Validators.minLength(3), validField]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(7)]),
      cnfpassword: new FormControl("",[Validators.required, Validators.minLength(7)]),

    })
  }

  get username(){
    // console.log(this.signupForm.get('username')?.value.trim());
    // if(/\s/.test(this.signupForm.get('username')?.value)){
    //   console.log("spaces");
    // }

    // if(this.signupForm.get('username')?.value.startsWith(' ')){
    //   console.log("starts");
    // }
    return this.signupForm.get('username');
  }
  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }


  getErrorMessage() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  passwordVisibility(event: MouseEvent){
    this.show=!this.show;
    event.stopPropagation();
  }

  showPassword(event: MouseEvent){
    this.showCnf=!this.showCnf;
    event.stopPropagation();
  }



  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  onSubmit():void{
    if (this.signupForm.valid) {
      const password = this.signupForm.get('password')?.value;
      const cnfpassword = this.signupForm.get('cnfpassword')?.value;
  
      if (password !== cnfpassword) {
        this.signupForm.get('cnfpassword')?.setErrors({ 'mismatch': true });
        return;
      }
      console.log('Form submitted:', this.signupForm.value);

      // this.authService.signUp(this.signupForm.value)
      // .subscribe((msg)=>console.log(msg));

      this.authService.signUp(this.signupForm.value)
      .subscribe({
        next: (response)=>{
          console.log("Signup Success:", response);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },

        error: (error)=>{
          console.log("Error Occured:", error);
          if(error.status===401)
            this.openSnackBar("Email already Exists");
          }
      });
    }
  }
}
